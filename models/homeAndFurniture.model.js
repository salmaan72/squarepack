"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let kitchenDiningSchema = new Schema({
  name: String,
  material: String,
  price: Number,
  currency: String,
  highlights: [String],
  services: [String]
});

let furnitureSchema = new Schema({
  name: String,
  highlights: [String],
  price: Number,
  currency: String,
  size: [String],
  services: [String]
});

let homeSchema = new Schema({
  kitchen_dining: [kitchenDiningSchema],
  dining_serving: [kitchenDiningSchema],
  furniture: [furnitureSchema],
  searchId: String
});

const homeDecorModel = mongoose.model('homeDecor_model', homeSchema);

module.exports = homeDecorModel;
