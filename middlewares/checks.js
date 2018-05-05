"use strict"

const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');

let checks = {};

checks.isLoggedin = function(req, res, next){
  if(req.headers.cookie !== undefined && req.headers.cookie !== null){
    let token = splitCookies.cookieSplit(req.headers.cookie).token;
    if(token === undefined || token === null){

      next();
      return;
    }
    verifyToken.verifyUserToken(token, res, function(authData){
      if(authData.user){
        res.send('Already logged in');
      }
      else {
        next();
      }
    });
  }
  else {
    next();
  }

}

module.exports = checks;
