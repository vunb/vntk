'use strict';
var test = require('tape'),
    vntk = require('../../lib/vntk'),
    ws = vntk.word_sent;

test('word_sent simple case', function (t) {
    t.plan(9);

    t.equal(ws.tag('Thương mại và các sản phẩm cũng vậy.', 'text'), 'Thương_mại và các sản_phẩm cũng vậy .');
    t.equal(ws.tag('Nhờ đó, chúng ta có thể kiềm chế căng thẳng và các xung đột tiếm năng không dẫn tới xung đột quân sự.', 'text'), 'Nhờ đó , chúng_ta có_thể kiềm_chế căng_thẳng và các xung_đột tiếm năng không dẫn tới xung_đột quân_sự .');
    t.equal(ws.tag(' qua  bộ đồ  da  thú  ', 'text'), 'qua bộ đồ_da thú', 'multiple spaces');
    t.equal(ws.tag('con', 'text'), 'con');
    t.equal(ws.tag('Phải', 'text'), 'Phải');
    t.equal(ws.tag('Không', 'text'), 'Không');
    t.equal(ws.tag('Được không', 'text'), 'Được không');
    t.equal(ws.tag('', 'text'), '', 'empty string');
    t.equal(ws.tag('Tên?', 'text'), 'Tên ?', 'question mark');
});