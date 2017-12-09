'use strict';

var fs = require('fs');
var path = require('path');

// read from list
var words = fs.readFileSync(path.join(__dirname, './stopwords.txt'), 'utf8');

exports.words = words.split('\n').filter((word) => !!word);