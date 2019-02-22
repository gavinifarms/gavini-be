var mongoose = require('mongoose');
var crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    uname: String,
    password: String,
    fname: String,
    lname: String,
    email: String,
    mobile: Number,
    hash: String,
    salt: String,
    token: String,
    expiry_token: Date,
    session: String,
    admin: Boolean
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      email: this.email,
      id: this._id,
      permissions: this.getPermission(),
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

userSchema.methods.getPermission = function() {
  let scope = ['user']
  if(this.admin) {
    scope.push('admin');
  }
  return scope;
}

userSchema.methods.signout = function() {
  this.session = "signOut"
}

userSchema.methods.toAuthJSON = function() {
    let generateToken = this.generateJWT();
    return {
      ...this._doc,
      token: generateToken,
    };
};  
  

var User = mongoose.model('Users', userSchema);

module.exports = User;