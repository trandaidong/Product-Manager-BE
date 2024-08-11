const User = require("../../models/user.model");

module.exports = async (res) => {
    _io.once('connection', (socket) => {
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;

            // Thêm id của A vào acceptFriend của B
            const existUserAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if (!existUserAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: { acceptFriends: myUserId }
                }
                )
            }
            // Thêm id của B vào requestFriend của A
            const existUserBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if (!existUserBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: { requestFriends: userId }
                }
                )
            }
        });

        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;

            // Xóa id của A trong acceptFriend của B
            const existUserAinB = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            });
            if (existUserAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: { acceptFriends: myUserId }
                }
                )
            }
            // Xóa id của B trong requestFriend của A
            const existUserBinA = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            });
            if (existUserBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: { requestFriends: userId }
                }
                )
            }
        });

        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; // id B

            // Xóa id của A trong acceptFriend của B
            const existUserAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            if (existUserAinB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: { acceptFriends: userId }
                }
                )
            }
            // Xóa id của B trong requestFriend của A
            const existUserBinA = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            if (existUserBinA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: { requestFriends: myUserId }
                }
                )
            }
        });

        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; // id B

            // Thêm {user_id, room_chat_id} của A vào friendList của B
            // Xóa id của A trong acceptFriend của B
            const existUserAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            if (existUserAinB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {friendList: {
                        user_id: userId,
                        room_chat_id: ""
                    }},
                    $pull: { acceptFriends: userId }
                }
                )
            }
            // Thêm {user_id, room_chat_id} của A vào friendList của B
            // Xóa id của B trong requestFriend của A
            const existUserBinA = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            });
            if (existUserBinA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {friendList: {
                        user_id: myUserId,
                        room_chat_id: ""
                    }},
                    $pull: { requestFriends: myUserId }
                }
                )
            }
        });
    });
}