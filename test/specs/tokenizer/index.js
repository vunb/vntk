'use strict'
var test = require('tape')
var tokenizer = require('../../../lib/tokenizer')


test('vntk tokenizer', function (t) {
    t.plan(10)

    t.equal(
        tokenizer.stokenize('Tổng thống Nga coi việc Mỹ không kích căn cứ quân sự của Syria là "sự gây hấn nhằm vào một quốc gia có chủ quyền", gây tổn hại đến quan hệ Moscow-Washington.'),
        'Tổng thống Nga coi việc Mỹ không kích căn cứ quân sự của Syria là " sự gây hấn nhằm vào một quốc gia có chủ quyền " , gây tổn hại đến quan hệ Moscow - Washington .',
        'tokenize 1'
    )

    t.equal(
        tokenizer.stokenize('Vào tháng 10 năm ngoái, nghi phạm này từng bị bắt khi ăn cắp 25 mỹ phẩm trị giá 24.000 yen (hơn 200 USD) tại một cửa hàng giảm giá ở tỉnh Hyogo. Cùng năm, 4 thành viên khác cũng bị bắt vì ăn cắp một số lượng lớn son dưỡng môi và mỹ phẩm tại các cửa hiệu ở Osaka. Sau khi bị truy tố, 3 người trong số này được hưởng án treo.'),
        'Vào tháng 10 năm ngoái , nghi phạm này từng bị bắt khi ăn cắp 25 mỹ phẩm trị giá 24.000 yen ( hơn 200 USD ) tại một cửa hàng giảm giá ở tỉnh Hyogo . Cùng năm , 4 thành viên khác cũng bị bắt vì ăn cắp một số lượng lớn son dưỡng môi và mỹ phẩm tại các cửa hiệu ở Osaka . Sau khi bị truy tố , 3 người trong số này được hưởng án treo .',
        'tokenize 2'
    )

    t.equal(
        tokenizer.stokenize('Giá khuyến mãi: 140.000đ / kg  ==> giảm được 20%'),
        'Giá khuyến mãi : 140.000 đ / kg ==> giảm được 20 %',
        'tokenize 3'
    )

    t.equal(
        tokenizer.stokenize('Microsoft hôm nay đã công bố cấu hình chính thức của thế hệ Xbox tiếp theo, tên mã Scorpio, và tin tưởng đây là loại console có sức mạnh xử lý cao nhất hiện giờ, mạnh hơn cả PS4 Pro. Tại buổi demo sản phẩm, Xbox Scorpio có thể chơi game đua xe Forza độ phân giải 4K với tốc độ đạt tới 60 khung hình/giây. Đồng thời Xbox Scorpio cũng sẽ tương thích với các tựa game Xbox cũ và quan trọng hơn nữa đó là các tựa game đó sẽ có đồ họa đẹp hơn, FPS cao hơn, thời gian load nhanh hơn khi chạy trên Xbox Scorpio.'),
        'Microsoft hôm nay đã công bố cấu hình chính thức của thế hệ Xbox tiếp theo , tên mã Scorpio , và tin tưởng đây là loại console có sức mạnh xử lý cao nhất hiện giờ , mạnh hơn cả PS4 Pro . Tại buổi demo sản phẩm , Xbox Scorpio có thể chơi game đua xe Forza độ phân giải 4K với tốc độ đạt tới 60 khung hình / giây . Đồng thời Xbox Scorpio cũng sẽ tương thích với các tựa game Xbox cũ và quan trọng hơn nữa đó là các tựa game đó sẽ có đồ họa đẹp hơn , FPS cao hơn , thời gian load nhanh hơn khi chạy trên Xbox Scorpio .',
        'tokenize 4'
    )

    t.equal(
        tokenizer.stokenize('Tuyên bố của Điện Kremlin cũng nhấn mạnh, vụ tấn công sẽ “hủy hoại nghiêm trọng quan hệ Nga-Mỹ” và tạo ra “trở ngại cực lớn” cho việc tạo lập một liên minh quốc tế chống Tổ chức Nhà nước Hồi giáo tự xưng (IS).'),
        'Tuyên bố của Điện Kremlin cũng nhấn mạnh , vụ tấn công sẽ “ hủy hoại nghiêm trọng quan hệ Nga - Mỹ ” và tạo ra “ trở ngại cực lớn ” cho việc tạo lập một liên minh quốc tế chống Tổ chức Nhà nước Hồi giáo tự xưng ( IS ) .',
        'tokenize 5'
    )

    t.equal(
        tokenizer.stokenize('Ngày 11 tháng 3 là ngày thứ 70 (71 trong năm nhuận) trong lịch Gregory. Còn 295 ngày trong năm.'),
        'Ngày 11 tháng 3 là ngày thứ 70 ( 71 trong năm nhuận ) trong lịch Gregory . Còn 295 ngày trong năm .',
        'tokenize 6'
    )

    t.equal(
        tokenizer.stokenize('Kết quả xổ số điện toán Vietlott ngày 6/2/2017'),
        'Kết quả xổ số điện toán Vietlott ngày 6/2/2017',
        'tokenize 7'
    )

    t.equal(
        tokenizer.stokenize('Theo thông báo kết luận thanh tra của UBND tỉnh Thanh Hoá sáng nay 30/3, giai đoạn 2010-2015 Sở Xây dựng Thanh Hoá đã bổ nhiệm một số trưởng phòng, phó phòng chưa có trình độ Trung cấp lý luận chính trị, chưa qua lớp bồi dưỡng nghiệp vụ quản lý nhà nước, không đúng quy định của UBND tỉnh Thanh Hoá.'),
        'Theo thông báo kết luận thanh tra của UBND tỉnh Thanh Hoá sáng nay 30/3 , giai đoạn 2010 - 2015 Sở Xây dựng Thanh Hoá đã bổ nhiệm một số trưởng phòng , phó phòng chưa có trình độ Trung cấp lý luận chính trị , chưa qua lớp bồi dưỡng nghiệp vụ quản lý nhà nước , không đúng quy định của UBND tỉnh Thanh Hoá .',
        'tokenize 8'
    )

    t.equal(
        tokenizer.stokenize('Ngày 6/2 6/2/2014 6-2 6-2-99 6.2 7.3.2014 2010-2015'),
        'Ngày 6/2 6/2/2014 6-2 6-2-99 6.2 7.3.2014 2010 - 2015',
        'tokenize 9 - datetime'
    )

    t.equal(
        tokenizer.stokenize('UBND. HĐND. TP.'),
        'UBND. HĐND. TP.',
        'tokenize 10 - abbreviation'
    )

})