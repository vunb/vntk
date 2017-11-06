/**
 * Public VNTK APIs
 * 
 * Copyright (C) 2016 VNTK Project
 * Author: Nhu Bao Vu <nhubaovu@gmail.com>
 * Homepage: https://vntk.github.io/
 */

;[
    'util',
    'tokenizer',
    'word_sent',
    'pos_tag',
    'chunking',
    'ner',
].forEach(function (feature) {
    exports[feature] = require('./' + feature);
});