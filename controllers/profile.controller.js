"use strict"

const profileController = {};

const db = require('./../models');
const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');
const responseGenerator = require('./../libs/responseGenerator');

profileController.profile = function(req,res){
  db.userModel.findOne({'email': res.locals.userEmail}, function(err, foundUser){
    let userObj = {};
    userObj['fullname'] = foundUser.firstname+' '+foundUser.lastname;
    userObj['email'] = foundUser.email;
    let response = responseGenerator.response('success', 200, 'successfully loggedin.', userObj);
    res.send(response);
  });
}

module.exports = profileController;
