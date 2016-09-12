var test = require("tape");
var vntk = require("../../lib/vntk")

test("word segment text", function (t) {
    t.plan(2);

    t.equal(vntk.ws().segment("Thương mại và các sản phẩm cũng vậy."), "Thương_mại và các sản_phẩm cũng vậy .");
    t.equal(vntk.ws().segment("Nhờ đó, chúng ta có thể kiềm chế căng thẳng và các xung đột tiếm năng không dẫn tới xung đột quân sự."), "Nhờ đó , chúng_ta có_thể kiềm_chế căng_thẳng và các xung_đột tiếm_năng không dẫn tới xung_đột_quân_sự .");
});