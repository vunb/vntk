var test = require("tape"),
    vntk = require("../../lib/vntk"),
    ws = vntk.ws();

test("tokenize words to an array", function (t) {
    t.plan(1);

    t.deepEqual(ws.tokenize('Xin chào Việt Nam'), ['Xin', 'chào', 'Việt Nam']);
});