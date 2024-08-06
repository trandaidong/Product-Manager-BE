var mongoose = require('mongoose');
const geneerate=require("../helper/generate.js");

const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expireAt:{
        type: Date,
        expires: 300
    }

},{ // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, 'forgot-password');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = ForgotPassword;