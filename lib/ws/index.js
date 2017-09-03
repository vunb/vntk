/**
 * Word Segmentation
 * 
 * @ex: ws().segment("Chào mừng bạn đến với đất nước Việt Nam!!")
 * @out: Chào mừng bạn đến với đất_nước Việt_Nam
 */

var dongdu = require('dongdu');
var normalizer = require('../normalizers/normalizer');

class Tokenizer {
    constructor(options) {
        this.options = {
            dataPath: __dirname,
        }

        Object.assign(this.options, options);

        this.ws = dongdu.getPredictor(this.options.dataPath);
        this.segment = this.ws.segment.bind(this.ws);
    }

    tokenize(text) {
        if (!text) {
            return [];
        }

        // normalize ?
        text = normalizer.normalize(text);

        var seg = this.segment(text);
        var tokens = seg.split(/\s+/).map((token) => token.replace('_', ' '));
        return tokens;
    }
}

module.exports = function (path) {
    return new Tokenizer(path);
};