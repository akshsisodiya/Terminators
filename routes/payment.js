const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const PaymentDetail = require("../models/Payment");
const { ensureAuth } = require("../middleware/auth");

let razorpayObject = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const uuid = () => {
  let uuid = "",
    ii;
  for (ii = 0; ii < 32; ii += 1) {
    switch (ii) {
      case 8:
      case 20:
        uuid += "-";
        uuid += ((Math.random() * 16) | 0).toString(16);
        break;
      case 12:
        uuid += "-";
        uuid += "4";
        break;
      case 16:
        uuid += "-";
        uuid += ((Math.random() * 4) | 8).toString(16);
        break;
      default:
        uuid += ((Math.random() * 16) | 0).toString(16);
    }
  }
  return uuid;
};

router.get("/", ensureAuth, (req, res) => {
  res.render("payment/order", {
    title: "Juice",
  });
});

router.post("/order", ensureAuth, (req, res) => {
  params = {
    //change this value if amount is variable
    amount: 20 * 100,
    currency: "INR",
    receipt: uuid(),
    payment_capture: "1",
  };
  razorpayObject.orders.create(params).then(async (response) => {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const paymentDetail = new PaymentDetail({
      user: req.user._id,
      orderId: response.id,
      receiptId: response.receipt,
      amount: response.amount,
      currency: response.currency,
      createdAt: response.created_at,
      status: response.status,
    });
    try {
      // Render Order Confirmation page if saved succesfully
      await paymentDetail.save();
      res.render("payment/checkout", {
        title: "Confirm Order",
        razorpayKeyId: razorpayKeyId,
        paymentDetail: paymentDetail,
      });
    } catch (err) {
      // Throw err if failed to save
      if (err) throw err;
    }
  });
});

router.post("/verify", async (req, res, next) => {
  console.log(req.body);
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  let crypto = require("crypto");
  let expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.razorpay_signature) {
    await PaymentDetail.findOneAndUpdate(
      { orderId: req.body.razorpay_order_id },
      {
        paymentId: req.body.razorpay_payment_id,
        signature: req.body.razorpay_signature,
        status: "paid",
      },
      { new: true }
    ).then((data) => {
      
      res.render("payment/success", {
        title: "Payment successful",
        paymentDetail: data,
      });
    }).catch(err=>{
        throw  err
    });
  } else {
    res.render("payment/fail", {
      title: "Payment fail",
    });
  }
});

module.exports = router;
