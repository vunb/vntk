'use strict';
var test = require('tape'),
    vntk = require('../../lib/vntk'),
    pos = vntk.pos_tag;

test('pos_tag simple case', function (t) {
    t.plan(2);

    let text = 'Cán bộ xã và những chiêu "xin làm hộ nghèo" cười ra nước mắt';
    let tags = pos.tag(text);
    let expected = [
        ['Cán bộ', 'N'],
        ['xã', 'N'],
        ['và', 'C'],
        ['những', 'L'],
        ['chiêu', 'N'],
        ['"', 'CH'],
        ['xin', 'V'],
        ['làm', 'V'],
        ['hộ', 'N'],
        ['nghèo', 'A'],
        ['"', 'CH'],
        ['cười', 'V'],
        ['ra', 'V'],
        ['nước mắt', 'N']
    ];

    t.deepEqual(pos.tag(''), [], 'empty string');
    t.deepEqual(tags, expected, text);
});