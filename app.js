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
  mongoose.connection.db.listCollections({name:"electronics_models"}).toArray(function(err, arr){
    if(arr.length === 0){
      eventEmitter.emit('instantiate models');
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
eventEmitter.once('instantiate models', function(){
  let electronics_id, men_id, women_id, kids_id, furniture_id;
  async.series([function(callback){
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
      electronics_id = String(data._id);
      callback(null, 1);
    }).catch(function(err){
      console.log(err); // ************************* edit
    });
  },
  function(callback){
    // men model
    let newmenModel = new db.menModel({
      footwear: [],
      top_wear: [],
      bottom_wear: [],
      sports_wear: [],
      searchId: '#men_products'
    });
    newmenModel.save().then(function(data){
      men_id = String(data._id);
      callback(null, 2);
    }).catch(function(err){
      console.log(err); //************************* edit
    });
  },
  function(callback){
    // women model
    let newwomenModel = new db.womenModel({
      footwear: [],
      ethnic_wear: [],
      western_wear: [],
      sports_wear: [],
      searchId: '#women_products'
    });
    newwomenModel.save().then(function(data){
      women_id = String(data._id);
      callback(null, 3);
    }).catch(function(err){
      console.log(err) //******************************** edit
    });
  },
  function(callback){
    //baby&kids model
    let newkidsModel = new db.kidsModel({
      toys: [],
      boys_clothing: [],
      girls_clothing: [],
      searchId: '#kids_products'
    });
    newkidsModel.save().then(function(data){
      kids_id = String(data._id);
      callback(null, 4);
    }).catch(function(err){
      console.log(err) //**************************** edit
    });
  },
  function(callback){
    // home & furniture model
    let newhome = new db.homeAndFurnitureModel({
      kitchen_dining: [],
      dining_serving: [],
      furniture: [],
      searchId: '#homeAndFurniture_products'
    });
    newhome.save().then(function(data){
      furniture_id = String(data._id);
      callback(null, 5);
    }).catch(function(err){
      console.log(err) //*************************** edit
    });
  },
  function(callback){
    eventEmitter.emit('instantiate categories', electronics_id, men_id, women_id, kids_id, furniture_id);
  }
], function(err, result){
  if(err){
    console.log(err)  //******************************* edit
  }
});

});

eventEmitter.once('instantiate categories', function(electronics_id, men_id, women_id, kids_id, furniture_id){
  let catnew = new db.catModel({
    catId: '#categories',
    electronics: {
      cat: "electronics",
      subcat: [
        "mobiles",
        "laptops",
        "televisions",
        "cameras",
        "mobile_accessories"
      ],
      _products: electronics_id
    },
    men: {
      cat: "men",
      subcat: [
        "footwear",
        "top_wear",
        "bottom_wear",
        "sports_wear"
      ],
      _products: men_id
    },
    women: {
      cat: "women",
      subcat: [
        "footwear",
        "western_wear",
        "ethnic_wear",
        "sports_wear"
      ],
      _products: women_id
    },
    kids: {
      cat: "baby&kids",
      subcat: [
        "toys",
        "boys_clothing",
        "girls_clothing"
      ],
      _products: kids_id
    },
    home_furniture: {
      cat: "home_furniture",
      subcat: [
        "kitchen_dining",
        "dining_serving",
        "furniture"
      ],
      _products: furniture_id
    }
  });
  catnew.save()
});

eventEmitter.once('create admin creds', function(){
  let saltRounds = 10;
  bcrypt.hash('333-666-999', saltRounds, function(err, hash) {
    let admincreds = new db.adminModel({
      adminId: 'admin@squarepack.com',
      key: hash
    });
    admincreds.save();
  });
});
