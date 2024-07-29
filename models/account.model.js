var mongoose = require('mongoose');
const geneerate=require("../helper/generate.js");

const accountSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: geneerate.generateRandomString(20) // sinh ki tu voi do dai 20
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{ // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const Account = mongoose.model("Account", accountSchema, 'accounts');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = Account;