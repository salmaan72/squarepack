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
      if(req.query.cat === 'electronics'){
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
    path: '1._products'
  }).then(function(data){
    res.send(data[0][1]);
  }).catch(function(err){
    res.send(err);
  });
}

module.exports = productController;
