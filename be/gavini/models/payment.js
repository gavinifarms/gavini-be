var mongoose = require('mongoose');

var paymentSchema = mongoose.Schema({
    user: mongoose.Types.ObjectId,
    order: mongoose.Types.ObjectId,
    mode: String,
    amount: String,
    status: String,
    is_reverted: Boolean
});

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;