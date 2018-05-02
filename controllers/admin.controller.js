"use strict"

const db = require('./../models');
const bcrypt = require('bcrypt');
const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');
const config = require('./../libs/config');
const jwt = require('jsonwebtoken');

let adminController = {};

adminController.login = function(req,res){
  db.adminModel.findOne({'adminId':req.body.adminId}, function(err,foundUser){
    if(err){
      res.send(err);
    }
    else if(foundUser === null || foundUser === undefined){
      res.send('wrong username/password');
    }
    else {
      bcrypt.compare(req.body.key, foundUser.key, function(err, resp) {
        if(resp){
          jwt.sign({user: foundUser.adminId}, config.secret_admin, function(err,token){
            if(err){
              res.send(err);
            }

            res.cookie('adminToken',token,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.redirect('/admin/dashboard');
          });
        }
        else{
          res.send('wrong username/password');
        }
      });
    }
  });
}

adminController.logout = function(req, res){
  res.clearCookie('adminToken',{path:'/'});
  res.clearCookie('io',{path:'/'});
  res.redirect('/');
}

adminController.dashboard = function(req,res){
  res.send('admin dashboard'); // add a dashboard view

}

module.exports = adminController;
