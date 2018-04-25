"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toysSchema = new Schema({
  brand: String,
  material: String,
  price: Number,
  currency: String,
  highlights: [String]
});

const clothingSchema = new Schema({
  brand: String,
  price: Number,
  currency: String,
  highlights: [String]
});

const kidsSchema = new Schema({
  toys: [toysSchema],
  boys_clothing: [clothingSchema],
  girls_clothing: [clothingSchema],
  searchId: String
});

let kidsModel = mongoose.model('kids_model', kidsSchema);

module.exports = kidsModel;
