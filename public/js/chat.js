import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

const upload = new FileUploadWithPreview.FileUploadWithPreview(
    'upload-image',
    {
        multiple: true,
        maxFileCount: 6
    }
);

// CLIENT_SEND_MESSENGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray || [];
        if (content || images.length > 0) {
            socket.emit("CLIENT_SEND_MESSENGE", {
                content: content,
                images: images
            });

            e.target.elements.content.value = "";
            upload.resetPreviewPanel(); // clear all selected images

            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    })
}
// END_CLIENT_SEND_MESSENGE

// SERVER_RETURN_MESSENGE
socket.on("SERVER_RETURN_MESSENGE", (msg) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const boxTyping = document.querySelector(".chat .inner-list-typing");

    const div = document.createElement("div");

    let htmtFullName = "";
    let htmlContent = "";
    let htmlImages = "";

    if (myId == msg.userId) {
        div.classList.add("inner-outgoing");
    }
    else {
        div.classList.add("inner-incoming");
        htmtFullName = `<div class="inner-name"> ${msg.fullName}</div>`
    }
    if (msg.content) {
        htmlContent += `<div class="inner-content"> ${msg.content}</div>`
    }
    if (msg.images.length > 0) {
        htmlContent = `<div class="inner-images">`;
        for (const image of msg.images) {
            htmlContent += `<img src="${image}">`
        }
        htmlContent += `</div>`;
    }
    div.innerHTML = `
        ${htmtFullName}
        ${htmlContent}
        ${htmlImages}
    `

    body.insertBefore(div, boxTyping);
    // scroll xuống cuối cùng
    body.scrollTop = body.scrollHeight;

    const boxImage=div.querySelector(".inner-images");
    if(boxImage){
        const gallery = new Viewer(boxImage);
    }
})
// END SERVER_RETURN_MESSENGE

// scroll chat to buttom
const bodychat = document.querySelector(".inner-body");
if (bodychat) {
    bodychat.scrollTop = bodychat.scrollHeight;
}
// end scroll chat to buttom

// emoji-picker
//show popup
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}

// show typing
var timeOut;
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeOut); // Xóa timeOut của vòng lập trước đó

    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 1000);
}
// end show typing

// insert icon into inputs  
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener("emoji-click", event => {
        inputChat.value = inputChat.value + event.detail.unicode;
        // fix lỗi khi nhập icon bị focus về đầu hàng
        const end = inputChat.value.length;
        inputChat.setSelectionRange(end, end);
        inputChat.focus();

        showTyping();
    })

    inputChat.addEventListener("keyup", () => {
        showTyping();
    })
}
// end-emoji-picker

//SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (msg) => {
        if (msg.type == "show") {
            const ExistTyping = elementListTyping.querySelector(`[user-id="${msg.userId}"]`);

            if (!ExistTyping) {
                console.log(ExistTyping);
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", msg.userId);
                boxTyping.innerHTML = `
                    <div class="inner-name">${msg.fullName} </div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>  
                `
                elementListTyping.appendChild(boxTyping);
                bodychat.scrollTop = bodychat.scrollHeight;
            }
        }
        else {
            const boxTypingRemove = elementListTyping.querySelector(`[user-id="${msg.userId}"]`);
            if (boxTypingRemove) {
                elementListTyping.removeChild(boxTypingRemove);
            }
        }
    })
}

//END_SERVER_RETURN_TYPING

// preview image
const chatBody=document.querySelector(".chat .inner-body");
if(chatBody){
    const gallery = new Viewer(chatBody);
}
// end preview image