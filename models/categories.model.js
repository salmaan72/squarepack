"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
  catId: String,
  electronics: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'electronics_model',
      required: true
    }
  },
  men: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: "men_model",
      required: true
    }
  },
  women: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'women_model',
      required: true
    }
  },
  kids: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'kids_model',
      required: true
    }
  },
  home_furniture: {
    cat: String,
    subcat: [String],
    _products: {
      type: Schema.ObjectId,
      ref: 'homefurniture_model',
      required: true
    }
  }
});

let catModel = mongoose.model('categories_model', catSchema);

module.exports = catModel;
