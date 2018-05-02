"use strict"

const nodemailer = require('nodemailer');
const responseGenerator = require('./../libs/responseGenerator');
const userModel = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('./../libs/config');
const db = require('./../models');
const splitCookies = require('./../libs/splitCookies');
const bcrypt = require('bcrypt');

let passwordRecovery = {};

// Generate test SMTP service account from ethereal.email
passwordRecovery.sendEmail = function(req,res){
  userModel.findOne({"email":req.body.email},function(err,user){
    if(user){
      const otp = Math.floor(100000 + Math.random() * 900000);
      let otpToken;
      jwt.sign({otp: String(otp)}, config.secret_otp, function(err,token){
        otpToken = token;

        nodemailer.createTestAccount(function(err, account){

          const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              // use these credentials to login on https://ethereal.email
              user: 'rcwkybo22n7vfqiv@ethereal.email',
              pass: 'T7rDp5egTezqN1czM3'
            }
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"squarepack" <support@squarepack.com>', // sender address
            to: user.email, // list of receivers
            subject: 'password reset', // Subject line
            text: otp+' is OTP for resetting password. This OTP is valid for 10 minutes', // plain text body
            html: otp+' '+'<b>is OTP for resetting password. This OTP is valid for 10 minutes </b>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.cookie('otpToken',otpToken,{ httpOnly: true, maxAge: 10 * 60 * 1000 });
            jwt.sign({email: user.email}, config.secret_otp, function(err,emailToken){
              res.cookie('emailToken',emailToken,{ httpOnly: true, maxAge: 15 * 60 * 1000 });
              let response = responseGenerator.response('success', 200, 'mail sent. Check your email to recover password', null);
              res.send(response);
            });
          });
        });
      });
    }
    else{
      let response = responseGenerator.response('failed', 200, 'No account is associated with this email. Try again', null);
      res.send(response);
    }
  })
}

passwordRecovery.verifyOtp = function(req, res){
  let otpToken_cookie = splitCookies.cookieSplit(req.headers.cookie).otpToken;
  console.log(otpToken_cookie);
  if(otpToken_cookie){
    jwt.verify(otpToken_cookie, config.secret_otp, function(err,authData){

      if(authData.otp === req.body.otp){
        res.cookie('setpass','set a new password',{ httpOnly: true, maxAge: 5 * 60 * 1000 });
        res.clearCookie('otpToken',{path:'/'});
        let response = responseGenerator.response('success', 200, 'otp verified successfully. Try setting a new password on localhost:3000/reset-password', null);
        res.send(response);
      }
      else {
        let response = responseGenerator.response('failed', 400, 'wrong otp. Check mail and enter again', null);
        res.send(response);
      }
    });
  }
  else{
    let response = responseGenerator.response('failed', 400, 'Previous otp expired. Try again!', null);
    res.send(response);
  }
}

passwordRecovery.resetPassword = function(req, res){
  let setpass_cookie = splitCookies.cookieSplit(req.headers.cookie).setpass;
  let email_cookie = splitCookies.cookieSplit(req.headers.cookie).emailToken;
  if(setpass_cookie){
    jwt.verify(email_cookie, config.secret_otp, function(err,authData){
      db.userModel.findOne({'email': authData.email}, function(err, foundUser){
        bcrypt.hash(req.body.new_password, 10, function(err, hash) {
          foundUser.password = hash;
          foundUser.save().then(function(data){
            res.clearCookie('setpass',{path:'/'});
            res.clearCookie('emailToken',{path:'/'});
            let response = responseGenerator.response('success', 200, 'Password changed successfully', null);
            res.send(response);
          }).catch(function(err){
            let response = responseGenerator.response('failed', 500, 'Error occured: '+err, null);
            res.send(response);
          });
        });
      });
    });
  }
  else{
    let response = responseGenerator.response('failed', 400, 'session expired. Try again!', null);
    res.send(response);
  }
}

module.exports = passwordRecovery;
