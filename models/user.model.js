"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  signup_date: Date
});

const userModel = mongoose.model('user_model', userSchema);

module.exports = userModel;
