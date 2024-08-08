const Chat = require("../../models/chat.model.js");
const User = require("../../models/user.model.js");
const chatSocket=require("../../sockets/client/chat.socket.js")
// [GET] /chat/index
module.exports.index = async (req, res) => {
    // SocketIO
    chatSocket(res);
    // End SocketIO

    const chats = await Chat.find({
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