const mongoose = require('mongoose')
const { User } = require('./Users')

const OrderSchema = mongoose.Schema({
    orderNumber : {
        type: mongoose.ObjectId,
        required: true,
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    juice_a: {
        type: Number,
        required: true,
    },
    juice_b: {
        type: Number,
        required: true,
    },

}, {timestams: true})

module.exports = mongoose.model('Orders', OrderSchema)