"use strict"

const db = require('./../models');
const responseGenerator = require('./../libs/responseGenerator');

let categoryToModel = {};

categoryToModel.returnModel = function(req, res, next){
  let dbHandle;
  let filter;
  if(req.query.cat === 'electronics'){
    dbHandle = db.elecModel;
    filter = {
      'searchId': '#electronic_products'
    };
  }
  else if(req.query.cat === 'men'){
    dbHandle = db.menModel;
    filter = {
      'searchId': '#men_products'
    };
  }
  else if(req.query.cat === 'women'){
    dbHandle = db.womenModel;
    filter = {
      'searchId': '#women_products'
    };
  }
  else if(req.query.cat === 'kids'){
    dbHandle = db.kidsModel;
    filter = {
      'searchId': '#kids_products'
    };
  }
  else if(req.query.cat === 'home_furniture'){
    dbHandle = db.homeAndFurnitureModel;
    filter = {
      'searchId': '#homeAndFurniture_products'
    };
  }
  else{
    let response  = responseGenerator.response('failed', 422, 'Invalid product category', null);
    res.send(response);
  }

  res.locals.dbHandle = dbHandle;
  res.locals.filter = filter;
  next();
}

module.exports = categoryToModel;
