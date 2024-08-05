// alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = document.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
}
// end alert


/* button-go-back */
const buttonGoBack=document.querySelectorAll("[button-go-back]");
if(buttonGoBack.length>0){
    buttonGoBack.forEach(button=>{
        button.addEventListener("click",()=>{
            history.back();
        });
    })
}
/* end button-go-back */