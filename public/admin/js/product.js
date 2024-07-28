// change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path");

    // lọc qua từng nút bấm và bắt sự kiện onclic => thay đổi đường dẫn router trong form (action)
    buttonChangeStatus.forEach(button => {
        button.addEventListener('click', () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let statusChange = statusCurrent === 'active' ? 'inactive' : 'active';

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();

            // hàm submit có được support bởi expressJS thay thế cho nút submit bên html để gửi form lên server
        })
    });
}
// end change status

// delete item

const buttonDeleteItem = document.querySelectorAll("[button-delete-item]");
console.log(buttonDeleteItem)
if (buttonDeleteItem.length) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDeleteItem.forEach(button => {
        button.addEventListener('click', () => {
            const isConfirm = confirm("Delete?");
            if (isConfirm) {
                const id = button.getAttribute("button-id");
                const action = path + `/${id}?_method=DELETE`;
                formDeleteItem.action = action;

                formDeleteItem.submit();
            }
        })
    })
}
// end delete item