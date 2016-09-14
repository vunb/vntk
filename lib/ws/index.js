/**
 * Word Segmentation
 * 
 * @ex: ws().segment("Chào mừng bạn đến với đất nước Việt Nam!!")
 * @out: Chào mừng bạn đến với đất_nước Việt_Nam
 */

var ws = require('bindings')('dongdu').getPredictor(__dirname);

module.exports = function () {
    return ws;
};