'use strict';
const test = require('tape');
const path = require('path');
const langid = require('../../lib/vntk').Langid;

test('vntk language identification', function (t) {
    t.plan(3);

    langid.detect('bạn ở đây trong bao lâu?')
        .then((lid) => {
            t.equal(lid, 'vi', 'Vietnamese');
        });
    langid.getLanguages('Wie lange bleiben Sie?', 5)
        .then((res) => {
            let lid = res[0].label;
            t.equal(lid, 'de', 'German');
            t.equal(res.length, 5, 'number of languagues are detected');
            console.log(res)
        });
})