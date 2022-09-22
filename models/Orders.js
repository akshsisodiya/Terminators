const mongoose = require('mongoose')
const { User } = require('./Users')

const OrderSchema = mongoose.Schema({
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
    status: {
        type: String,
        enum: ['success', 'pending', 'cancel'],
        required: true,
    }

}, {timestamps: true})

module.exports = mongoose.model('Orders', OrderSchema)