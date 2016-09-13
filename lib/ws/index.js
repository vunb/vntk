/**
 * Word Segmentation
 * 
 * @ex: ws().segment("Chào mừng bạn đến với đất nước Việt Nam!!")
 * @out: Chào mừng bạn đến với đất_nước Việt_Nam
 */

module.exports = function () {
    var ws = require('bindings')('dongdu').getPredictor(__dirname);
    return ws;
};