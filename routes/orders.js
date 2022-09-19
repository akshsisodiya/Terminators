const express = require('express')
const Orders = require('../models/Orders')
const router = express.Router()

router.post('/create', (req, res)=>{
    const order = {
        user : req.user._id ?? 1,
        juice_a: req.body.juice_a,
        juice_b: req.body.juice_b,
    }
    Orders.create(order, err=>console.log(err))
})

module.exports = router