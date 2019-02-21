var express = require('express');
var router = express.Router();
var auth = require('./auth');
var passport = require('passport');
var logger = require('../../modules/logger');
var User = require('../../models/user');

/* GET users listing. */
router.post('/', auth.optional, (req, res, next) => {

  const user = req.body;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User({
    email: user.email
  });

  finalUser.setPassword(user.password);
  
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/admin/create', auth.optional, (req, res, next) => {
  const user = req.body;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User({
    email: user.email,
    admin: true
  });

  finalUser.setPassword(user.password);
  
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/admin/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('')

})

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (info, passportUser, err) => {

    if(err) {
      return res.send(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
  })(req, res, next);
});

router.get('/signup', auth.optional, (req, res, next) => {
  
});

router.get('/signout', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      user.signout();
      return res.json({status: "done"});
    });
});

router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
