var express = require('express');
var router = express.Router();
var Address = require('../../models/address');

router.use(auth.require);

router.get('/', function(req, res, next) {
    
    let user = req.user;

    return Address.find({ user: req.user._id});
});

router.post('/create', function(req, res, next) {
    
    let user = req.user;

    let address = req.body;
    
    return new Address(address);
})

