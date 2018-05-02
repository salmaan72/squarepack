"use strict"

const db = require('./../models');
const moment = require('moment');
const responseGenerator = require('./../libs/responseGenerator');

let cartController = {};

cartController.addProductToCart = function(req, res){
  res.locals.dbHandle.findOne(res.locals.filter, function(err, found){
    for(let i in found[req.query.subcat]){
      if(String(found[req.query.subcat][i]['_id']) === req.query.id){
        db.cartModel.findOne({'email': res.locals.userEmail}, function(err, foundCart){
          let cartObj = {};
          cartObj['details'] = {'ordered': false};
          cartObj['product'] = found[req.query.subcat][i];
          foundCart['cart'].push(cartObj);

          foundCart.save().then(function(data){
            let response = responseGenerator.response('success', 200, 'Product added to cart', null);
            res.send(response);
          }).catch(function(err){
            let response = responseGenerator.response('failed', 500, 'error occured: '+err, null);
            res.send(response);
          });
        });
      }
    }
  });
}

cartController.getCartContent = function(req, res){
  db.cartModel.findOne({'email': res.locals.userEmail}, function(err, foundCart){
    let response = responseGenerator.response('success', 200, 'cart contents', foundCart);
    res.send(response);
  });
}

cartController.clearCart = function(req, res){
  db.cartModel.findOne({'email': res.locals.userEmail}, function(err, foundCart){
    foundCart['cart'] = [];
    foundCart.save().then(function(data){
      let response = responseGenerator.response('success', 200, 'cart cleared', data);
      res.send(response);
    }).catch(function(err){
      let response = responseGenerator.response('failed', 500, 'Error occured: '+err, null);
      res.send(response);
    })
  });
}

cartController.orderFromCart = function(req, res){
  db.cartModel.findOne({'email': res.locals.userEmail}, function(err, found){
    for(let i in found['cart']){
      if(String(found['cart'][i]['_id']) === req.query.id){
        Date.prototype.addDays = function(days) {
          this.setDate(this.getDate() + parseInt(days));
          return this;
        };
        let currentDate = new Date();
        let shipping_date = currentDate.addDays(7);

        found['cart'][i]['details'] = {
          'ordered': true,
          'ordered_date': Date.now(),
          'expected_shipping_date': shipping_date
        };
        found.save().then(function(data){
          let response = responseGenerator.response('success', 200, 'Product ordered successfully', data['cart'][i]);
          res.send(response);
        }).catch(function(err){
          let response = responseGenerator.response('failed', 500, 'Error occured: '+err, null);
          res.send(response);
        });

      }
    }
  });
}

module.exports = cartController;
