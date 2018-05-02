
"use strict"

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');
const config = require('./../libs/config');
const db = require('./../models');

let userController = {};

userController.signup = function(req,res){
  let saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    let newUser = new db.userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
      signup_date: Date.now()
    });
    newUser.save().then(function(){
      res.redirect(307, '/signup-success');
    });
  });
  let newcart = new db.cartModel({
    email: req.body.email,
    cart: []
  });
  newcart.save();
}

userController.login = function(req,res){
  db.userModel.findOne({'email':req.body.email}, function(err,foundUser){
    if(err){
      res.send(err);
    }
    else if(foundUser === null || foundUser === undefined){
      res.send('wrong username/password');
    }
    else {
      bcrypt.compare(req.body.password, foundUser.password, function(err, resp) {
        if(resp){
          jwt.sign({user: foundUser.email},config.secret,function(err,token){
            if(err){
              res.send(err);
            }
            let data = {
              name: foundUser.firstname+' '+foundUser.lastname
            }
            res.cookie('token',token,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            let name = foundUser.firstname+''+foundUser.lastname;
            res.redirect('/'+name+'/profile');
          });
        }
        else{
          res.send('wrong username/password');
        }
      });
    }
  });
}

  userController.logout = function(req,res){
    let token = splitCookies.cookieSplit(req.headers.cookie).token;
    verifyToken.verifyUserToken(token,res,function(authData){
      res.clearCookie('token',{path:'/'});
      res.clearCookie('io',{path:'/'});
      res.redirect('/');
    });
  }

  module.exports = userController;
