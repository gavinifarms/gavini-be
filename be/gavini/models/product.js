var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    title: String,
    price: String,
    discount: String,
    volumne: String,
    description: String,
    imageUrl: String,
});

productSchema.methods.createProduct = function(product) {
    console.log(product);
    this.name = product.name;
    this.title = product.title;
    this.price = product.price;
    this.discount = product.discount;
    this.description = product.description;
    this.imageUrl = product.imageUrl;

    this.save();
    return {...this._doc};
}

var Product = mongoose.model('Product', productSchema);

module.exports = Product;