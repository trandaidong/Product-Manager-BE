const User = require("../../models/user.model");
const userSocket = require("../../sockets/client/users.socket");

// [GET] /users/notFriend
module.exports.notFriend = async (req, res) => {
    // socket
    userSocket(res);
    // end socket 

    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId,
        status: "active",
        deleted: false,
    });
    const requestFriend = myUser.requestFriends;
    const acceptFriend = myUser.acceptFriends;

    const users = await User.find({
        $and: [
            { _id: { $ne: userId } },
            { _id: { $nin: requestFriend } },
            { _id: { $nin: acceptFriend } },
        ],
        status: "active",
        deleted: false,
    }).select("avatar fullname");

    res.render("client/pages/users/not-friend.pug", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}

module.exports.request = async (req, res) => {
     // socket
     userSocket(res);
     // end socket 

    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId,
        status: "active",
        deleted: false,
    });
    const requestFriend = myUser.requestFriends;

    const users = await User.find({
        _id: { $in: requestFriend },
        status: "active",
        deleted: false,
    }).select("id avatar fullname");
    res.render("client/pages/users/request.pug", {
        pageTitle: "Lời mời đã gửi",
        users: users
    })
}
module.exports.accept = async (req, res) => {
    // socket
    userSocket(res);
    // end socket 
    
   const userId = res.locals.user.id;

   const myUser = await User.findOne({
       _id: userId,
       status: "active",
       deleted: false,
   });
   const acceptFriends = myUser.acceptFriends;

   const users = await User.find({
       _id: { $in: acceptFriends },
       status: "active",
       deleted: false,
   }).select("id avatar fullname");
   res.render("client/pages/users/accept.pug", {
       pageTitle: "Lời mời đã nhận",
       users: users
   })
}
module.exports.friends = async (req, res) => {
    // socket
    userSocket(res);
    // end socket 
    
   const userId = res.locals.user.id;

   const myUser = await User.findOne({
       _id: userId,
       status: "active",
       deleted: false,
   });
   const friendList = myUser.friendList;
   const friendListId=friendList.map(item=>{
    return item.user_id;
   });
   console.log(friendListId);

   const users = await User.find({
       _id: { $in: friendListId },
       status: "active",
       deleted: false,
   }).select("id avatar fullname statusOnline");

   res.render("client/pages/users/friends.pug", {
       pageTitle: "Danh sách bạn bè",
       users: users
   })
}