"use strict"

const logger = require('morgan');
const config = require('./config');
const fs = require('fs');
const path = require('path');

let logs = {};





logs.errorLog = function(req, res, next){
  let errorlogStream = fs.createWriteStream('./squarepack_logs/error.log', { flags: 'a', encoding: 'utf8' });
  logger(config.logFormat, {
    skip: function(req,res){
      return res.statusCode < 400;
    },
    stream: errorlogStream
  });
  next();
}

logs.accessLog = function(req, res, next){
  let accesslogStream = fs.createWriteStream('./squarepack_logs/access.log', { flags: 'a', encoding: 'utf8' });
  logger(config.logFormat, {
    skip: function(req, res){
      return res.statusCode >= 400;
    },
    stream: accesslogStream
  });
  next();
}

module.exports = logs;
