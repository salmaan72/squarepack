"use strict"

const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');

exports.authorise = function(req, res, next){
  let token = splitCookies.cookieSplit(req.headers.cookie).adminToken;
  verifyToken.verifyAdminToken(token,res,function(authData){
    res.locals.userEmail = authData.user;
    next();
  });
}
