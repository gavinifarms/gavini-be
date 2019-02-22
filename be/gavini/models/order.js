var mongoose = require('mongoose');
var itemSchema = require('../schema/items');

var orderSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    items: [itemSchema],
    amount: Number,
    discount: Number,
    address: mongoose.Types.ObjectId,
    created: Date,
    paymentMethod: String,
    status: String,
    subscription_order: Boolean
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;