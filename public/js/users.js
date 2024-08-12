// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-users").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");

            socket.emit("CLIENT_ADD_FRIEND", userId);
        })
    })
}
// Hết chức năng gửi yêu cầu

// Chức năng hủy yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-users").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");

            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })
    })
}
// Hết chức năng hủy yêu cầu 

// Chức năng gửi xóa yêu cầu
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-users").classList.add("refuse");
            const userId = button.getAttribute("btn-refuse-friend");

            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })
    })
}
// Hết chức năng gửi xóa yêu cầu

// Chức năng chấp nhận yêu cầu
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-users").classList.add("accepted");
            const userId = button.getAttribute("btn-accept-friend");

            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        })
    })
}
// Hết chức năng chấp nhận yêu cầu

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgetUserAccept = document.querySelector("[badge-user-accept]");
    const userId = badgetUserAccept.getAttribute("badge-user-accept");
    if (userId == data.userId) {
        badgetUserAccept.innerHTML = data.lengthAcceptFriends
    }
})
// END_SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    // Trang lời mời kết bạn
    const dataUserAccept = document.querySelector("[data-user-accept]");
    if (dataUserAccept) {
        const userId = dataUserAccept.getAttribute("data-user-accept");
        if (userId == data.userId) {
            // Vẽ user ra giao diên
            const newBoxUser = document.createElement("div");
            newBoxUser.classList.add("col-3")
            newBoxUser.setAttribute("user-id", data.userInfoA._id);
            newBoxUser.innerHTML = `
                <div class="box-users">
                    <div class="inner-avatar">
                        <img src=${(data.userInfoA.avatar ? data.userInfoA.avatar : "/images/avatar.jpg")} alt="${data.userInfoA.fullname}">
                    </div>
                    <div class="inner-info">
                        <div class="inner-name">${data.userInfoA.fullname}</div>
                        <div class="inner-buttons">
                            <button class="btn btn-sm btn-primary mr-1" btn-accept-friend=${data.userInfoA._id}>Chấp nhận</button>
                            <butotn class="btn btn-sm btn-secondary mr-1" btn-refuse-friend=${data.userInfoA._id}>Xóa</butotn>
                            <butotn class="btn btn-sm btn-secondary mr-1" btn-deleted-friend disabled="disabled">Đã xóa</butotn>
                            <butotn class="btn btn-sm btn-primary mr-1" btn-accepted-friend disabled="disabled">Đã chấp nhận</butotn>
                        </div>
                    </div>
                </div>
            `
            dataUserAccept.appendChild(newBoxUser);

            // xóa lời mời kết bạn
            const btnRefuseFriend = newBoxUser.querySelector("[btn-refuse-friend]");

            btnRefuseFriend.addEventListener("click", () => {
                btnRefuseFriend.closest(".box-users").classList.add("refuse");
                const userId = button.getAttribute("btn-refuse-friend");

                socket.emit("CLIENT_REFUSE_FRIEND", userId);
            })

            // chấp nhận lời mời kết bạn
            const btnAcceptFriend = newBoxUser.querySelector("[btn-accept-friend]");
            btnAcceptFriend.addEventListener("click", () => {
                btnAcceptFriend.closest(".box-users").classList.add("accepted");
                const userId = button.getAttribute("btn-accept-friend");

                socket.emit("CLIENT_ACCEPT_FRIEND", userId);
            })
        }
    }
    // Hết trang lời mời kết bạn

    // Trang danh sách người dùng
    const dataUserNotFriend = document.querySelector("[data-users-not-friend]");
    if (dataUserNotFriend) {
        const userId = dataUserNotFriend.getAttribute("data-users-not-friend");
        if (userId == data.userId) {
            // Xóa A ra khỏi danh sách của B
            const boxUserRemove = dataUserNotFriend.querySelector(`[user-id="${data.userInfoA._id}"]`);
            if (boxUserRemove) {
                dataUserNotFriend.removeChild(boxUserRemove);
            }
        }
    }
    // Hết trang danh sách người dùng
})
// END_SERVER_RETURN_INFO_ACCEPT_FRIEND

// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
    const dataUserAccept = document.querySelector("[data-user-accept]");
    const userId = dataUserAccept.getAttribute("data-user-accept");
    if (userId == data.userId) {
        // Xóa A ra khỏi danh sách của B
        const boxUserRemove = dataUserAccept.querySelector(`[user-id="${data.userIdA}"]`);
        if (boxUserRemove) {
            dataUserAccept.removeChild(boxUserRemove);
        }
    }
})
// END_SERVER_RETURN_USER_ID_CANCEL_FRIEND
// SERVER_RETURN_USER_ONLINE
console.log("ok")
socket.on("SERVER_RETURN_USER_ONLINE", (userId) => {
    const dataUserFriend = document.querySelector("[data-user-friend]");
    if (dataUserFriend) {
        const boxUser = dataUserFriend.querySelector(`[user-id="${userId}"]`);
        if (boxUser) {
            boxUser.querySelector("[status]").setAttribute("status", "Online");
        }
    }
})
// END_SERVER_RETURN_USER_ONLINE

// SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE", (userId) => {
    const dataUserFriend = document.querySelector("[data-user-friend]");
    if (dataUserFriend) {
        const boxUser = dataUserFriend.querySelector(`[user-id="${userId}"]`);
        if (boxUser) {
            boxUser.querySelector("[status]").setAttribute("status", "Offline");
        }
    }
})
// END_SERVER_RETURN_USER_OFFLINE