"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let mobileLaptopSchema = new Schema({
  brand: String,
  model: String,
  price: Number,
  currency: String,
  highlights: [String],
  description: String
});

let tvSchema = new Schema({
  brand: String,
  model: String,
  display_size: String,
  Screen_type: String,
  resolution: String,
  in_box: [String],
  highlights: [String],
  price: Number,
  currency: String
});

let cameraSchema = new Schema({
  brand: String,
  model: String,
  price: Number,
  currency: String,
  camera_type: String,
  highlights: [String],
  description: String,
  sensor_features: {
    sensor_type: String,
    image_sensor_type: String
  },
  lens_features: {
    optical_zoom: String,
    lens_mount: String
  }
});

let mobAccessoriesSchema = new Schema({
  product: String,
  brand: String,
  model: String,
  highlights: [String],
  price: Number,
  currency: String
});

let elecSchema = new Schema({
  mobiles: [mobileLaptopSchema],
  laptops: [mobileLaptopSchema],
  televisions: [tvSchema],
  cameras: [cameraSchema],
  mobile_accessories: [mobAccessoriesSchema],
  searchId: String
});

let elecModel = mongoose.model('electronics_model', elecSchema);

module.exports = elecModel;
