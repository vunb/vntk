var _ = require('lodash');
var replacer = require('../util').replacer;

var teencode = require('./model/teencode.json');
var abbr = require('./model/abbr.json');

var conversionTables = _.merge({}, teencode, abbr);
var normalizer = replacer(conversionTables);

exports.normalize = function (str) {
    return normalizer(str);
}