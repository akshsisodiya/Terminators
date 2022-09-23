const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderId: {
    type: String,
    required: true,
  },
  receiptId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  signature: {
    type: String,
  },
  amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("PaymentDetail", PaymentSchema);
