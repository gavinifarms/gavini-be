var express = require('express');
var indexRouteV1 = require('./v1/index');
var userRouteV1 = require('./v1/users');
var productRouteV1 = require('./v1/product');

var v1 = express.Router();
v1.use('/', indexRouteV1);
v1.use('/users', userRouteV1);
v1.use('/product', productRouteV1);

var v2 = express.Router();

module.exports = {
    v1: v1,
    v2: v2
}