var mongoose = require('mongoose');
var itemsSchema = require('../schema/items');

var pausedSchema = mongoose.Schema({
    start_date: Date,
    end_date: Date
})

var subscriptionSchema = mongoose.Schema({
    user: mongoose.Types.ObjectId,
    start_date: Date,
    days_left: Number,
    items: [itemSchema],
    status: String,
    total_amount: Number,
    paused_intervals: [pausedSchema]
})

var Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;