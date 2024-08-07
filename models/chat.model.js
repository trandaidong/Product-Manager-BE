var mongoose = require('mongoose');
const geneerate=require("../helper/generate.js");

const chatSchema = new mongoose.Schema({
    user_id: String,
    room_chat_id: String,
    content: String,
    images:Array,
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{ 
    timestamps: true
})
const Chat = mongoose.model("Chat", chatSchema, 'chats');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = Chat;