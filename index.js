'use strict';
var express = require('express');
var consign = require('consign');

const app = express();

consign({verbose: false})
    .include("lib/config.js")
    .then("db.js")
    .then("lib/middlewares.js")
    .then("routes")
    .then("lib/boot.js")
    .into(app);
    
module.exports = app;