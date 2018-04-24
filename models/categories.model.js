"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
  catId: String,
  1: {
    cat: String,
    _id: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'electronics_model',
      required: true
    }
  },
  2: {
    cat: String,
    _id: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: "men_model"
    }
  },
  3: {
    cat: String,
    _id: String,
    subcat: [String]
  },
  4: {
    cat: String,
    _id: String,
    subcat: [String]
  },
  5: {
    cat: String,
    _id: String,
    subcat: [String]
  }
});

let catModel = mongoose.model('categories_model', catSchema);

module.exports = catModel;
