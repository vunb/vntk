'use strict';

class Tokenizer {

    trim(arr) {
        while (!arr[arr.length - 1])
            arr.pop();

        while (!arr[0])
            arr.shift();

        return arr;
    }

    attach() {
        let self = this;
        String.prototype.tokenize = function () {
            return self.tokenize(this);
        }
    }

    tokenize(text) {
        return text.split(/\s+/);
    }

    stokenize(text, sep) {
        return this.tokenize(text).join(sep || ' ');
    }
}

module.exports = Tokenizer;