"use strict"

const express = require('express');
const routes = express();

const userController = require('./controllers/user.controller');
const profileController = require('./controllers/profile.controller');
const productController = require('./controllers/product.controller');

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

routes.get('/:user/profile', profileController.profile);

// *********************  product routes  ************************************
routes.get('/product-by-category', productController.getProductByCategory);

module.exports = routes;
