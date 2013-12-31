#!/usr/local/bin/node

var cook = require('../lib/cook.js'),
    args = require('optimist').argv;

cook.app(args);

