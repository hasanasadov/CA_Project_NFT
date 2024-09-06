const form2 = document.querySelector(".form-footer");
const footer_email = form2.querySelector("input");

function validateEmailInput() {
    let value = footer_email.value.trim();
    let isTrue = true;
    if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        footer_email.parentElement.classList.remove("error8");
        footer_email.parentElement.classList.remove("errorbadge");
        footer_email.parentElement.classList.add("done8");
    } else {
        footer_email.parentElement.classList.add("error8");
        footer_email.parentElement.classList.remove("done8");
        footer_email.parentElement.classList.add("errorbadge");
        isTrue = false;
    }
    return isTrue;
}

function footeremail() {
    footer_email.addEventListener("keyup", validateEmailInput);
}


form2.addEventListener("submit", (e) => {
    e.preventDefault();

    let isEmailValid = validateEmailInput();

    if (isEmailValid) {
        Toastify({
            text: "Subscribed successfully",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info",
        }).showToast();
    }
    else {
        Toastify({
            text: "Not subscribed",
            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
            className: "info",
        }).showToast();
    }
});

footeremail()
