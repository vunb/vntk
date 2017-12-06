'use strict';
const test = require('tape');
const vntk = require('../../lib/vntk');

test('classify text', function (t) {
    t.plan(2);

    let classifier = new vntk.BayesClassifier();

    classifier.addDocument('khi nào trận chiến đã kết thúc?', 'when');
    classifier.addDocument('tàu rời đi lúc mấy giờ?', 'when');
    classifier.addDocument('trận đấu diễn ra vào thời gian nào?', 'when');
    classifier.addDocument('anh ấy rời đi vào lúc mấy giờ?', 'when');
    classifier.addDocument('bao giờ thì đến lễ hội hóa trang?', 'when');
    classifier.addDocument('ai phát hiện ra điện ?', 'who');
    classifier.addDocument('người sáng lập ra microsoft là ai?', 'who');
    classifier.addDocument('ai kiếm được tiền của họ một cách chăm chỉ ?', 'who');
    classifier.addDocument('người phát minh tạo ra.', 'who');
    classifier.addDocument('gia đình bạn gồm những ai?', 'who');

    classifier.train();
    

    t.equal(classifier.classify('chiến tranh thế giới bắt đầu vào lúc nào?'), 'when', 'classify when');
    t.equal(classifier.classify('kẻ thù của luffy là ai?'), 'who', 'classify who');

})