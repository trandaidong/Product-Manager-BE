var mongoose = require('mongoose');
const geneerate = require("../helper/generate.js");

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: geneerate.generateRandomString(20) // sinh ki tu voi do dai 20
    },
    phone: String,
    avatar: String,
    friendList: [
        {
            user_id: String,
            room_chat_id: String
        }
    ],
    acceptFriends: Array,
    requestFriends: Array,
    statusOnline: String,
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const User = mongoose.model("User", userSchema, 'user');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = User;