"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
  catId: String,
  1: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'electronics_model',
      required: true
    }
  },
  2: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: "men_model",
      required: true
    }
  },
  3: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'women_model',
      required: true
    }
  },
  4: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'kids_model',
      required: true
    }
  },
  5: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'homedecor_model',
      required: true
    }
  }
});

let catModel = mongoose.model('categories_model', catSchema);

module.exports = catModel;
