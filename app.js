"use strict"

const express = require('express');
const app = express();

const events = require('events');
const eventEmitter = new events.EventEmitter();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes');
const adminRoutes = require('./adminRoutes');
const db = require('./models');
const bcrypt = require('bcrypt');
const async = require('async');
const logs = require('./libs/logs');

//app.use(morgan('dev'));
app.use(logs.errorLog);
app.use(logs.accessLog);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/squarepack', function(){
  console.log('mongodb connected on default port');

  // create categories collection if not present
  mongoose.connection.db.listCollections({name:"categories_models"}).toArray(function(err, arr){
    if(arr.length === 0){
      eventEmitter.emit('instantiate categories');
    }
  });
  // creating admin credentials
  mongoose.connection.db.listCollections({name:"admin_models"}).toArray(function(err, arr){
    if(arr.length === 0){
      eventEmitter.emit('create admin creds');
    }
  });
});

app.use('/', routes);
app.use('/admin', adminRoutes);

const PORT = 3000;

app.listen(PORT, function(){
  console.log('Server listening on port '+PORT);
});

// *******************************************  events  *********************************************//
eventEmitter.once('instantiate categories', function(){

  let elec_id;
  // electronics model
  let newelecModel = new db.elecModel({
    mobiles: [],
    laptops: [],
    televisions: [],
    cameras: [],
    mobile_accessories: [],
    searchId: '#electronic_products'
  });
  newelecModel.save().then(function(data){
    elec_id = String(data._id);

    let catnew = new db.catModel({
      catId: '#categories',
      1: {
        cat: "electronics",
        _id: "#electronics",
        subcat: [
          "mobiles",
          "laptops",
          "televisions",
          "cameras",
          "mobile accessories"
        ],
       _products: elec_id
      },
      2: {
        cat: "men",
        _id: "#men",
        subcat: [
          "footwear",
          "top wear",
          "bottom wear",
          "sports wear"
        ]
      },
      3: {
        cat: "women",
        _id: "#women",
        subcat: [
          "footwear",
          "western wear",
          "ethnic wear",
          "sports wear"
        ]
      },
      4: {
        cat: "baby&kids",
        _id: "#baby&kids",
        subcat: [
          "toys",
          "boys' clothing",
          "girls' clothing"
        ]
      },
      5: {
        cat: "home&furniture",
        _id: "#home&furniture",
        subcat: [
          "kitchen & dining",
          "dining & serving",
          "furniture"
        ]
      }
    });
    catnew.save()

  }).catch(function(err){
    console.log(err);
  });
  // men model
  let newmenModel = new db.menModel({
    footwear: [],
    top_wear: [],
    bottom_wear: [],
    sports_wear: []
  });
  newmenModel.save();

  });
  /*function getElecProductsId(){
    db.elecModel.findOne({'searchId': '#electronic_products'}, function(err, found){
      elec_id = found._id;
    });
  }
  getElecProductsId();
*/


eventEmitter.on('create admin creds', function(){
  let saltRounds = 10;
  bcrypt.hash('333-666-999', saltRounds, function(err, hash) {
    let admincreds = new db.adminModel({
      adminId: 'admin@squarepack.com',
      key: hash
    });
    admincreds.save();
  });
});
