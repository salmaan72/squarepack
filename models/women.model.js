"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let footwearSchema = new Schema({
  brand: String,
  footwear_type: String,
  price: Number,
  currency: String,
  size_uk_india: [Number],
  highlights: [String]
});

let clothingSchema = new Schema({
  brand: String,
  size: [String],
  type: String,
  highlights: [String],
  price: Number,
  currency: String,
  fabric: String
});

let womenSchema = new Schema({
  footwear: [footwearSchema],
  ethnic_wear: [clothingSchema],
  western_wear: [clothingSchema],
  sports_wear: [clothingSchema],
  searchId: String
});

let womenModel = mongoose.model('women_models', womenSchema);

module.exports = womenModel;
