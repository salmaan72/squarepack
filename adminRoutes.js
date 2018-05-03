"use strict"

const express = require('express');
const routes = express();

const adminController = require('./controllers/admin.controller');
const productController = require('./controllers/product.controller');
const splitCookies = require('./libs/splitCookies');
const verifyToken = require('./libs/verifyToken');;
const categoryToModel = require('./middlewares/categoryToModel');
const authoriseAdmin = require('./middlewares/authoriseAdmin');
// ************************** note:  default path /admin  **************************** //

// admin login (/admin/login)
routes.route('/login').get(function(req, res){
  res.render();
}).post(adminController.login);

// logout (/admin/logout)
routes.post('/logout', authoriseAdmin.authorise, adminController.logout);

// admin dashboard
routes.get('/dashboard', authoriseAdmin.authorise, adminController.dashboard);

// adding products to the database
routes.post('/add-product', authoriseAdmin.authorise, productController.addProduct);

// editing the info of a particular product
routes.post('/edit-product', authoriseAdmin.authorise, categoryToModel.returnModel, productController.editProduct);

// deleting a product
routes.post('/delete-product', authoriseAdmin.authorise, categoryToModel.returnModel, productController.deleteProduct);

//************** Routes for both users and admin  ****************************//

routes.get('/get-categories', authoriseAdmin.authorise, productController.getCategories);

routes.get('/product-by-category', authoriseAdmin.authorise, productController.getProductByCategory);

routes.get('/all-products', authoriseAdmin.authorise, productController.allProducts);

module.exports = routes;
