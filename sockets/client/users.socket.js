const User = require("../../models/user.model");
const RoomChat=require("../../models/room-chat.model");

module.exports = async (res) => {
    _io.once('connection', (socket) => {
        // Người dùng gửi yêu cầu kết bạn
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
            // lấy độ dài acceptFriend của B trả về cho B
            const userInfoB = await User.findOne({
                _id: userId
            })
            const lengthAcceptFriends = userInfoB.acceptFriends.length

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId, // Đặt tên giống nhau thì js tự hiểu như này mà không cần gì rõ
                lengthAcceptFriends
            })

            // Lấy thông tin của A trả về cho B
            const userInfoA = await User.findOne({
                _id: myUserId
            }).select("id avatar fullname")
            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
                userId,
                userInfoA
            })
        });

        // người dùng gửi yêu cầu hủy kết bạn
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

            // lấy độ dài acceptFriend của B trả về cho B
            const userInfoB = await User.findOne({
                _id: userId
            })
            const lengthAcceptFriends = userInfoB.acceptFriends.length

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId, // Đặt tên giống nhau thì js tự hiểu như này mà không cần gì rõ
                lengthAcceptFriends
            })

            // lấy user id của A trả về cho B
            socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND",{
                userId: userId,
                userIdA: myUserId
            }
            )
        });

        // người dùng gửi yêu cầu từ chối kết bạn
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

        // người dùng chấp nhận kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; // id B

            const existUserAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            });
            const existUserBinA = await User.findOne({
                _id: userId,
                requestFriends: myUserId
            });

            // Tạo phòng chat
            let roomChat;
            if(existUserAinB && existUserBinA){
                roomChat=new RoomChat({
                    typeRoom: "friend",
                    users:[
                        {
                            user_id: myUserId,
                            role: "SupperAdmin"
                        },
                        {
                            user_id: userId,
                            role: "SupperAdmin"
                        }
                    ]
                })
                await roomChat.save();

            }

            // Thêm {user_id, room_chat_id} của A vào friendList của B
            // Xóa id của A trong acceptFriend của B
            if (existUserAinB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat_id: roomChat.id
                        }
                    },
                    $pull: { acceptFriends: userId }
                }
                )
            }
            // Thêm {user_id, room_chat_id} của A vào friendList của B
            // Xóa id của B trong requestFriend của A
            if (existUserBinA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        friendList: {
                            user_id: myUserId,
                            room_chat_id: roomChat.id
                        }
                    },
                    $pull: { requestFriends: myUserId }
                }
                )
            }
        });
    });
}