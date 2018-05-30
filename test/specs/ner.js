'use strict';
var test = require('tape'),
    vntk = require('../../lib/vntk'),
    ner = vntk.ner();

test('ner simple case', function (t) {
    t.plan(3);

    let text = 'Bộ Công Thương xóa một tổng cục, giảm nhiều đầu mối';
    let tags = ner.tag(text);

    t.deepEqual(ner.tag(''), [], 'empty string');
    t.deepEqual(tags[0][3], 'B-ORG', 'B-ORG');
    t.deepEqual(tags[1][3], 'I-ORG', 'I-ORG');
});

test('load custom model from file', function (t) {
    t.plan(3);

    let newModelPath = require('path').resolve(__dirname, './models/model.bin');
    let newNER = ner.newModel(newModelPath);
    let text = 'Nhật ký SEA Games ngày 21/8: Ánh Viên thắng giòn giã ở vòng loại.';
    let tags = newNER.tag(text);

    console.log('New model:', tags);

    t.deepEqual(newNER.tag(''), [], 'empty string');
    t.deepEqual(tags[6][3], 'B-PER', 'B-PER from new model');
    t.deepEqual(tags[7][3], 'I-PER', 'I-PER from new model');
});

test('load custom model from file (2)', function (t) {
    t.plan(3);

    let newModelPath = require('path').resolve(__dirname, './models/model.bin');
    let newNER = vntk.ner(newModelPath);
    let text = 'Nhật ký SEA Games ngày 21/8: Ánh Viên thắng giòn giã ở vòng loại.';
    let tags = newNER.tag(text);

    console.log('New model:', tags);

    t.deepEqual(newNER.tag(''), [], 'empty string');
    t.deepEqual(tags[6][3], 'B-PER', 'B-PER from new model');
    t.deepEqual(tags[7][3], 'I-PER', 'I-PER from new model');
});

test('ner format text', function (t) {
    t.plan(1);

    let text = 'Chưa tiết lộ lịch trình tới Việt Nam của Tổng thống Mỹ Donald Trump';
    let expected = 'Chưa  tiết lộ  lịch trình  tới [LOC Việt Nam] của  Tổng thống [LOC Mỹ] [PER Donald Trump]';

    let result = ner.tag(text, 'text');

    t.equal(result, expected, expected);
});

