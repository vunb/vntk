var test = require('tape'),
    normalizer = require('../../lib/normalizers/normalizer')


test('should be replace teen code', function (t) {
    t.plan(2);

    t.equal(normalizer.normalize('hok bjk làm j'), 'không biết làm gì');
    t.equal(normalizer.normalize('thì làm ntn'), 'thì làm như thế nào');
});