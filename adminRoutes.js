"use strict"

const express = require('express');
const routes = express();

const adminController = require('./controllers/admin.controller');
const productController = require('./controllers/product.controller');
const splitCookies = require('./libs/splitCookies');
const verifyToken = require('./libs/verifyToken');
// ************************** note:  default path /admin  **************************** //

// admin login (/admin/login)
routes.route('/login').get(function(req, res){
  res.render();
}).post(adminController.login);

// logout (/admin/logout)
routes.post('/logout', adminController.logout);

// admin dashboard
routes.get('/dashboard', adminController.dashboard);

// adding products to the database
routes.post('/add-product', productController.addProduct);

module.exports = routes;
