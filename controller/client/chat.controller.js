const Chat=require("../../models/chat.model.js");
const User=require("../../models/user.model.js");

// [GET] /chat/index
module.exports.index = async (req, res) => {
    // SocketIO
    const userId=res.locals.user.id;
    const fullName=res.locals.user.fullname;

    _io.once('connection', (socket) => { // once: kết nối 1 lần thôi
        socket.on("CLIENT_SEND_MESSENGE",async (content)=>{
            const chat=new Chat({
                user_id: userId,
                content: content
            });

            await chat.save();

            _io.emit("SERVER_RETURN_MESSENGE",{
                userId: userId,
                fullName: fullName,
                content: content
            })
        })
    });
    // End SocketIO

    const chats=await Chat.find({
        deleted: false
    });
    for (const chat of chats) {
        const userInfo=await User.findOne({
            _id: chat.user_id,
            deleted: false
        }).select("fullname");
        chat.userInfo=userInfo;
    }
    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats: chats
    })
}