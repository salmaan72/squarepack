"use strict"

const db = require('./../models');
const responseGenerator = require('./../libs/responseGenerator');
const mongoose = require('mongoose');


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

module.exports = productController;
