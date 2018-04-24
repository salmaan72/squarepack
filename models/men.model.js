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
  highlights: [String],
  price: Number,
  currency: String,
  fabric: String
});

let menSchema = new Schema({
  footwear: [footwearSchema],
  top_wear: [clothingSchema],
  bottom_wear: [clothingSchema],
  sports_wear: [clothingSchema]
});

let menModel = mongoose.model('men_model', menSchema);

module.exports = menModel;
