const RoomChat = require("../../models/room-chat.model");

module.exports.isAccess = async (req, res, next) => {
    const userId = res.locals.user.id;
    const roomId = req.params.roomChatId;
    try {
        const isAccessRoomChat = await RoomChat.findOne({
            _id: roomId,
            "users.user_id": userId,
            deleted: false
        })
        if (isAccessRoomChat) {
            next();
        } else {
            res.redirect("/");
        }
    } catch {
        res.redirect("/");
    }
}