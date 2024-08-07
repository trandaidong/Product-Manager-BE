// CLIENT_SEND_MESSENGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        if (content) {
            socket.emit("CLIENT_SEND_MESSENGE", content);

            e.target.elements.content.value = "";
        }
    })
}
// END_CLIENT_SEND_MESSENGE

// SERVER_RETURN_MESSENGE
socket.on("SERVER_RETURN_MESSENGE", (msg) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");

    const div = document.createElement("div");

    let htmtFullName = "";


    if (myId == msg.userId) {
        console.log("inner-outgoing")
        div.classList.add("inner-outgoing");
    }
    else {
        console.log("inner-incoming")
        div.classList.add("inner-incoming");
        htmtFullName = `<div class="inner-name"> ${msg.fullName}</div>`
    }
    div.innerHTML = `
        ${htmtFullName}
        <div class="inner-content"> ${msg.content}</div>
    `
    body.appendChild(div);
})
// END SERVER_RETURN_MESSENGE