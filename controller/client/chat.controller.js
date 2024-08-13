const Chat = require("../../models/chat.model.js");
const User = require("../../models/user.model.js");
const chatSocket=require("../../sockets/client/chat.socket.js")
// [GET] /chat/roomChatId
module.exports.index = async (req, res) => {
    // SocketIO
    chatSocket(req, res);
    // End SocketIO

    const chats = await Chat.find({
        room_chat_id: req.params.roomChatId,
        deleted: false
    });
    for (const chat of chats) {
        const userInfo = await User.findOne({
            _id: chat.user_id,
            deleted: false
        }).select("fullname");
        chat.userInfo = userInfo;
    }
    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats: chats
    })
}