'use strict';
var test = require('tape'),
    vntk = require('../../lib/vntk'),
    ner = vntk.ner;

test('ner simple case', function (t) {
    t.plan(3);

    let text = 'Bộ Công Thương xóa một tổng cục, giảm nhiều đầu mối';
    let tags = ner.tag(text);

    t.deepEqual(ner.tag(''), [], 'empty string');
    t.deepEqual(tags[0][3], 'B-ORG', 'B-ORG');
    t.deepEqual(tags[1][3], 'I-ORG', 'I-ORG');
});