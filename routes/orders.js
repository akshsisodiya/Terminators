const express = require("express");
const Orders = require("../models/Orders");
var bodyParser = require('body-parser')
const router = express.Router();

// parse application/x-www-form-urlencoded
const boadyParser = bodyParser.urlencoded({ extended: false })


// parse application/json
const jsonParser = bodyParser.json()



router.get('/', (req,res)=>{
  res.render('orders',{
    layout:'main',
  })
})

router.post("/create", async (req, res) => {
  const order = {
    user: req.user._id,
    juice_a: parseInt(req.body.juice_a),
    juice_b: parseInt(req.body.juice_b),
    status: "pending"
  };
  const new_order = new Orders(order);
  await new_order.save();
  res.send('done')
});

module.exports = router;
