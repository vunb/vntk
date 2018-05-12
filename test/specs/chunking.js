'use strict';
var test = require('tape'),
    vntk = require('../../lib/vntk'),
    chunking = vntk.chunking();

test('chunking simple case', function (t) {
    t.plan(2);

    let text = 'Cán bộ xã và những chiêu "xin làm hộ nghèo" cười ra nước mắt';
    let tags = chunking.tag(text);
    let expected = [
        ['Cán bộ', 'N', 'B-NP'],
        ['xã', 'N', 'B-NP'],
        ['và', 'C', 'O'],
        ['những', 'L', 'B-NP'],
        ['chiêu', 'N', 'B-NP'],
        ['"', 'CH', 'O'],
        ['xin', 'V', 'B-VP'],
        ['làm', 'V', 'B-VP'],
        ['hộ', 'N', 'B-NP'],
        ['nghèo', 'A', 'B-AP'],
        ['"', 'CH', 'O'],
        ['cười', 'V', 'B-VP'],
        ['ra', 'V', 'B-VP'],
        ['nước mắt', 'N', 'B-NP']
    ];

    t.deepEqual(chunking.tag(''), [], 'empty string');
    t.deepEqual(tags, expected, text);
});

test('chucking format text', function (t) {
    t.plan(1);

    let text = 'Nhật ký SEA Games ngày 21/8: Ánh Viên thắng giòn giã ở vòng loại.';
    let expected = '[NP Nhật ký] [NP SEA] [NP Games] [NP ngày] [NP 21/8] : [NP Ánh Viên] [VP thắng] [NP giòn giã] [PP ở] [NP vòng] [NP loại] .';

    let result = chunking.tag(text, 'text');

    t.equal(result, expected, expected);
});