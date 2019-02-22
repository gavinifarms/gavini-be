const jwt = require('express-jwt');
const jwtToken = require('jsonwebtoken');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    
    console.log(jwtToken.decode(authorization.split(' ')[1]));
    return authorization.split(' ')[1];
  }
  return null;
};

const getTokenAdmin = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    let payloadVals = jwtToken.decode(authorization.split(' ')[1]);
    console.log(payloadVals.permissions)
    if(payloadVals.permissions.includes('admin')) {
      return authorization.split(' ')[1];
    }
  }
  return null;
}

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
  admin: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenAdmin
  })
};

module.exports = auth;