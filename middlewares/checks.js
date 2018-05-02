"use strict"

const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');

let checks = {};

checks.isLoggedin = function(req, res, next){
  let token = splitCookies.cookieSplit(req.headers.cookie).token;
  verifyToken.verifyUserToken(token, res, function(authData){
    if(authData.user){
      res.send('Already logged in');
    }
    else {
      next();
    }
  });
}

module.exports = checks;
