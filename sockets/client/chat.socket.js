const uploadToCloudinary = require("../../helper/uploadToCloundinary.js");
const Chat = require("../../models/chat.model.js");

module.exports = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullname;
    const roomId = req.params.roomChatId;

    _io.once('connection', (socket) => { // once: kết nối 1 lần thôi
        // tạo phòng socket để ai có mã phòng này thì mới nhận được msg từ server trả về
        socket.join(roomId);
        socket.on("CLIENT_SEND_MESSENGE", async (data) => {

            let images = [];
            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link);
            }
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images,
                room_chat_id: roomId
            });

            await chat.save();

            _io.to(roomId).emit("SERVER_RETURN_MESSENGE", {
                userId: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })

        socket.on("CLIENT_SEND_TYPING", async (type) => {
            socket.broadcast.to(roomId).emit("SERVER_RETURN_TYPING", {
                userId: userId,
                fullName: fullName,
                type: type
            })
        })
    });
}