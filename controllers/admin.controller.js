"use strict"

const db = require('./../models');
const bcrypt = require('bcrypt');
const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');
const config = require('./../libs/config');
const jwt = require('jsonwebtoken');
const responseGenerator = require('./../libs/responseGenerator');

let adminController = {};

adminController.login = function(req,res){
  db.adminModel.findOne({'adminId':req.body.adminId}, function(err,foundUser){
    if(err){
      let response = responseGenerator.response('failed', 400, 'Error occured: '+err, null);
      res.send(response);
    }
    else if(foundUser === null || foundUser === undefined){
      let response = responseGenerator.response('failed', 400, 'wrong username/password', null)
      res.send(response);
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
          let response = responseGenerator.response('failed', 400, 'wrong username/password', null);
          res.send(response);
        }
      });
    }
  });
}

adminController.logout = function(req, res){
  res.clearCookie('adminToken',{path:'/'});
  res.clearCookie('io',{path:'/'});
  let response = responseGenerator.response('success', 200, 'Admin successfully logged out', null);
  res.send(response);
}

adminController.dashboard = function(req,res){
  res.send('admin dashboard'); // add a dashboard view

}

module.exports = adminController;
