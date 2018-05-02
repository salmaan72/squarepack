"use strict"

const splitCookies = require('./../libs/splitCookies');
const responseGenerator = require('./../libs/responseGenerator');
const verifyToken = require('./../libs/verifyToken');

let userAndAdmin = {};

userAndAdmin.authenticateBoth = function(req, res, next){
  let token = splitCookies.cookieSplit(req.headers.cookie).token;
  let adminToken = splitCookies.cookieSplit(req.headers.cookie).adminToken;
  let finToken;
  if(token !== undefined){
    finToken = token;
  }
  else if(adminToken !== undefined){
    finToken = adminToken;
  }
  if(token !== undefined || adminToken !== undefined){
    verifyToken.verifyUserToken(finToken, res, function(authData){
      next();
    });
  }
  else {
    let response = responseGenerator.response('Authentication error', 401, 'Access denied. Please login to continue', null);
    res.json(response);
  }
}

module.exports = userAndAdmin;
