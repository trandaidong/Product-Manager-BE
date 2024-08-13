var mongoose = require('mongoose');

const roomChatSchema = new mongoose.Schema({
    title: String,
    avata: String,
    typeRoom: String,
    status: String,
    users:[
        {
            user_id: String,
            role: String
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const RoomChat = mongoose.model("RoomChat", roomChatSchema, 'rooms-chat');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = RoomChat;