/**
 * Word Segmentation
 * 
 * @ex: ws().segment("Chào mừng bạn đến với đất nước Việt Nam!!")
 * @out: Chào mừng bạn đến với đất_nước Việt_Nam
 */

var dongdu = require('dongdu');

module.exports = function (path) {
    var dataPath = path || __dirname;
    var ws = dongdu.getPredictor(dataPath);
    return ws;
};