"use strict"

const catModel = require('./models/categories.model');
const elecModel = require('./models/electronics.model');
const menModel = require('./models/men.model');
const userModel = require('./models/user.model');
const adminModel = require('./models/admin.model');
const womenModel = require('./models/women.model');
const kidsModel = require('./models/kids.model');
const homeAndFurnitureModel = require('./models/homeAndFurniture.model');

module.exports = {
  catModel,
  elecModel,
  menModel,
  userModel,
  adminModel,
  womenModel,
  kidsModel,
  homeAndFurnitureModel
};
