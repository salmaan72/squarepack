"use strict"

const express = require('express');
const routes = express();

const userController = require('./controllers/user.controller');
const profileController = require('./controllers/profile.controller');
const productController = require('./controllers/product.controller');
const authoriseUser = require('./middlewares/authoriseUser');
const cartController = require('./controllers/cart.controller');
const categoryToModel = require('./middlewares/categoryToModel');
const responseGenerator = require('./libs/responseGenerator');
const passwordRecovery = require('./controllers/passwordRecovery.controller');
const checks = require('./middlewares/checks');

routes.get('/', function(req,res){
  let response = responseGenerator.response('success', 200, 'Welcome to squarepack.', null);
  res.send(response);
});

// ******************  user routes  ****************************************
routes.route('/signup').get(function(req, res){
  res.render(); // add view
}).post(userController.signup);

routes.route('/login').get(function(req, res){
  res.render(); // add view
}).post(userController.login);

routes.post('/logout', userController.logout);

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

routes.get('/get-categories', authoriseUser.authorise, productController.getCategories);

routes.get('/product-by-category', authoriseUser.authorise, productController.getProductByCategory);

routes.get('/all-products', authoriseUser.authorise, productController.allProducts);


module.exports = routes;
