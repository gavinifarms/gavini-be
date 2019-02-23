var mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    user: mongoose.Types.ObjectId,
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;