"use strict"

const profileController = {};

const db = require('./../models');
const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');

profileController.profile = function(req,res){
  db.userModel.findOne({'email': res.locals.userEmail}, function(err, foundUser){
    let userObj = {};
    userObj['fullname'] = foundUser.firstname+' '+foundUser.lastname;
    userObj['email'] = foundUser.email;
    res.json(userObj);
  });
}

module.exports = profileController;
