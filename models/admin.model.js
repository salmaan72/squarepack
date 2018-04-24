"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let adminSchema = new Schema({
  adminId: String,
  key: String
});

const adminModel = mongoose.model('admin_model', adminSchema);

module.exports = adminModel;
