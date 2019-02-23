var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    user: mongoose.Types.ObjectId,
    name: String,
    fName: String,
    lName: String,
    mobile: Number,
    city: String,
    complete_address: String,
    Landmark: String,
    pincode: Number,
    default: Boolean
});

addressSchema.methods.validateAddress = function(addressJson) {
    return true;
}

var Address = mongoose.model('Address', addressSchema);

module.exports = Address;