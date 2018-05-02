"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartProductSchema = new Schema({
  details: {
    ordered: Boolean,
    ordered_date: Date,
    expected_shipping_date: Date
  },
  product: {}
});

const cartSchema = new Schema({
  email: String,
  cart: [cartProductSchema]
});

const cartModel = mongoose.model('cart_model', cartSchema);

module.exports = cartModel;
