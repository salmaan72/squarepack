"use strict"

const db = require('./../models');
const responseGenerator = require('./../libs/responseGenerator');
const mongoose = require('mongoose');
const splitCookies = require('./../libs/splitCookies');
const verifyToken = require('./../libs/verifyToken');

let productController = {};

productController.addProduct = function(req, res){
  let dbHandle;
  let filter;
  //console.log(req.query.cat+'  ' +req.query.subcat);
  db.catModel.findOne({'catId': '#categories'}, function(err, found){
    //console.log(found);
    let foundObj = found.toObject();

    for(let j in foundObj){
      //console.log(foundObj[j]);
      if(foundObj[j]['cat'] === req.query.cat){
        if(foundObj[j]['cat'] === 'electronics'){
          dbHandle = db.elecModel;
          filter = {
            'searchId': '#electronic_products'
          };
        }
        else if(foundObj[j]['cat'] === 'men'){
          dbHandle = db.menModel;
          filter = {
            'searchId': '#men_products'
          };
        }
        else if(foundObj[j]['cat'] === 'women'){
          dbHandle = db.womenModel;
          filter = {
            'searchId': '#women_products'
          }
        }
        else if(foundObj[j]['cat'] === 'baby&kids'){
          dbHandle = db.kidsModel;
          filter = {
            'searchId': '#kids_products'
          }
        }
        else if(foundObj[j]['cat'] === 'home_furniture'){
          dbHandle = db.homeAndFurnitureModel;
          filter = {
            'searchId': '#homeAndFurniture_products'
          }
        }

        dbHandle.findOne(filter, function(err, categoryProducts){
          let productObj = {};
          for(let i in req.body){
            productObj[i] = req.body[i];
          }
          categoryProducts[req.query.subcat].push(productObj);
          categoryProducts.save().then(function(data){
            let response = responseGenerator.response('success', 200, 'product inserted successfully', null);
            res.json(response);
          }).catch(function(err){
            let response = responseGenerator.response('failed', 500, 'product insertion failed. Internal server error', null);
            res.json(response);
          });
        });
        break;
      }
    }
  });
}

productController.getProductByCategory = function(req, res){
  db.catModel.find({}).populate({
    path: req.query.cat+'._products'
  }).then(function(data){
    res.send(data[0][req.query.cat]);
  }).catch(function(err){
    res.send(err);
  });
}

productController.allProducts = function(req, res){
  db.catModel.find({}).populate({
    path: 'electronics._products'
  }).populate({
    path: 'men._products'
  }).populate({
    path: 'women._products'
  }).populate({
    path: 'kids._products'
  }).populate({
    path: 'home_furniture._products'
  }).then(function(data){
    res.send(data);
  }).catch(function(err){
    res.send(err);
  });
}



productController.editProduct = function(req, res){
  res.locals.dbHandle.findOne(res.locals.filter, function(err, found){
    for(let i in found[req.query.subcat]){
      if(String(found[req.query.subcat][i]['_id']) === req.query.id){
        for(let key in req.body){
          if(found[req.query.subcat][i][key]){
            found[req.query.subcat][i][key] = req.body[key];
          }
        }
        found.save().then(function(data){
          let response = responseGenerator.response('success', 200, 'Product edited successfully', null);
          res.send(response);
        }).catch(function(err){
          let response = responseGenerator.response('failed', 500, 'Error occured: '+err, null);
          res.send(response);
        });
      }
    }
  });
}

productController.deleteProduct = function(req, res){
  res.locals.dbHandle.findOne(res.locals.filter, function(err, found){
    for(let i in found[req.query.subcat]){
      if(String(found[req.query.subcat][i]['_id']) === req.query.id){
        found[req.query.subcat].splice(found[req.query.subcat][i], 1);
        found.save().then(function(data){
          let response = responseGenerator.response('success', 200, 'Product deleted successfully', null);
          res.send(response);
        }).catch(function(err){
          let response = responseGenerator.response('failed', 500, 'Error occured: '+err, null);
          res.send(response);
        });
      }
    }
  });
}

productController.getCategories = function(req, res){
  db.catModel.findOne({'catId': '#categories'}, function(err, found){
    let response = responseGenerator.response('success', 200, 'Product categories', found);
    res.send(response);
  });
}

module.exports = productController;
