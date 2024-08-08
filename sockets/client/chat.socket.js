const uploadToCloudinary = require("../../helper/uploadToCloundinary.js");
const Chat = require("../../models/chat.model.js");

module.exports =async (res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullname;

    _io.once('connection', (socket) => { // once: kết nối 1 lần thôi

        socket.on("CLIENT_SEND_MESSENGE", async (data) => {

            let images = [];
            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link);
            }
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            });

            await chat.save();

            _io.emit("SERVER_RETURN_MESSENGE", {
                userId: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })

        socket.on("CLIENT_SEND_TYPING", async (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                userId: userId,
                fullName: fullName,
                type: type
            })
        })
    });
}