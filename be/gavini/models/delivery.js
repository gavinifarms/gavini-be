var mongoose = require('mongoose');

var deliverySchema = mongoose.Schema({
    order: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    address: mongoose.Types.ObjectId,
    created: Date,
    delivery_date: Date,
    status: String,
    // agent:?
});

var Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;