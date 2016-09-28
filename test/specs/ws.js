var test = require("tape")
    , vntk = require("../../lib/vntk")
    , ws = vntk.ws()
    ;

test("word segment text", function (t) {
    t.plan(4);

    t.equal(ws.segment("Thương mại và các sản phẩm cũng vậy."), "Thương_mại và các sản_phẩm cũng vậy .");
    t.equal(ws.segment("Nhờ đó, chúng ta có thể kiềm chế căng thẳng và các xung đột tiếm năng không dẫn tới xung đột quân sự."), "Nhờ đó , chúng_ta có_thể kiềm_chế căng_thẳng và các xung_đột tiếm_năng không dẫn tới xung_đột_quân_sự .");
    t.equal(ws.segment("qua bộ đồ da thú"), "qua bộ_đồ da_thú");
    t.equal(ws.segment(" ơi em đấy à "), "ơi em đấy à");
});