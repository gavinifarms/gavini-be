var express = require('express');
var router = express.Router();
var auth = require('./auth');
var guard = require('express-jwt-permissions')();

var Product = require('../../models/product');

checkAdmin = (req, res, next) => {
    console.log(req.body);
    // check if logggedin user is admin.
    next();
};

router.post('/create', auth.admin, (req, res, next) => {
    // console.log(req);

    let product = new Product({...req.body});

    return product.save()
        .then(() => res.json({ product: product }));
});

router.get('/doc/:id', auth.optional, (req, res, next) => {
    return Product.findById(req.params.id)
            .then((product) => {
                if(!product) {
                    return res.sendStatus(400);
                }
            return res.json(product);
        });
});

router.get('/all', auth.optional, (req, res, next) => {
    return Product.find().then((products) => {
        return res.json(products);
    });
})

module.exports = router;