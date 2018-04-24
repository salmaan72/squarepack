"use strict"

const profileController = {};

const db = require('./../models');
const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');

profileController.profile = function(req,res){
  let token = splitCookies.cookieSplit(req.headers.cookie).token;
  verifyToken.verifyUserToken(token,res,function(authData){
    db.userModel.findOne({'email': authData.user}, function(err, foundUser){
      let userObj = {};
      userObj['fullname'] = foundUser.firstname+' '+foundUser.lastname;
      userObj['email'] = foundUser.email;
      res.json(userObj);
    });
  });
}

module.exports = profileController;
