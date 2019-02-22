var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    product: mongoose.Types.ObjectId,
    quantity: String,
    price: Number,
    discount: Number
})

module.exports = itemSchema;