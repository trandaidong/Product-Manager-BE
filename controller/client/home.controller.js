//[GET] /
module.exports.index = (req, res) => { // đặt tên hàm là index
    res.render('client/pages/home/index.pug',{
        pageTitle: "Trang chủ"
    })
}