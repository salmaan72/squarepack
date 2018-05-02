"use strict"

const express = require('express');
const routes = express();

const userController = require('./controllers/user.controller');
const profileController = require('./controllers/profile.controller');
const productController = require('./controllers/product.controller');
const userAndAdmin = require('./middlewares/routesForUserAndAdmin');
const authoriseUser = require('./middlewares/authoriseUser');
const cartController = require('./controllers/cart.controller');
const categoryToModel = require('./middlewares/categoryToModel');
const passwordRecovery = require('./controllers/passwordRecovery.controller');
const checks = require('./middlewares/checks');

routes.get('/', function(req,res){
  res.send('Landing Page');
});

// ******************  user routes  ****************************************
routes.route('/signup').get(function(req, res){
  res.render(); // add view
}).post(userController.signup);

routes.route('/login').get(function(req, res){
  res.render(); // add view
}).post(userController.login);

routes.post('/logout', userController.logout);

routes.post('/signup-success', function(req, res){
  res.send('signup was successful. Login to continue'); // add view
});

routes.get('/:user/profile', authoriseUser.authorise, profileController.profile);

// cart routes
routes.post('/add-to-cart', authoriseUser.authorise, categoryToModel.returnModel, cartController.addProductToCart);

// get cart contents
routes.get('/get-cart', authoriseUser.authorise, cartController.getCartContent);

// clear cart contents
routes.post('/clear-cart', authoriseUser.authorise, cartController.clearCart);

// place order from cart
routes.post('/order-from-cart', authoriseUser.authorise, cartController.orderFromCart);

//password recovery
routes.post('/password-recovery', checks.isLoggedin,  passwordRecovery.sendEmail);
routes.post('/verify-otp', checks.isLoggedin, passwordRecovery.verifyOtp);
routes.post('/reset-password', checks.isLoggedin, passwordRecovery.resetPassword);


//************** Routes for both users and admin  ****************************//
//product routes
routes.get('/product-by-category', userAndAdmin.authenticateBoth, productController.getProductByCategory);

routes.get('/all-products', userAndAdmin.authenticateBoth, productController.allProducts);


module.exports = routes;
