const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
  adminField: 'user[admin]'
}, (email, password, admin, done) => {
  User.findOne({ email, admin })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'message': 'Username/Password is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));