// ------------------- Login Form Validation -----------------//
const nameinput = document.querySelector("#namediv input");
const pswinput = document.querySelector("#pswdiv input");
const form = document.querySelector("form");

function showPassword() {
    let icon = document.querySelector("#pswdiv i");
    let input = document.querySelector("#pswdiv input");
    icon.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    });
}

function validateNameInput() {
    let value = nameinput.value.trim();
    let isTrue = true;
    if (value.length >= 3) {
        nameinput.parentElement.classList.add("done6");
        nameinput.parentElement.classList.remove("error6");
        nameinput.parentElement.classList.remove("errorbadge");
        nameinput.style.border = "2px solid green";
    } else {
        nameinput.style.border = "2px solid red";
        nameinput.parentElement.classList.add("error6");
        nameinput.parentElement.classList.remove("done6");
        nameinput.parentElement.classList.add("errorbadge");
        isTrue = false;
    }
    return isTrue;
}

function nameInput() {
    nameinput.addEventListener("keyup", () => validateNameInput());
}

function validatePasswordInput() {
    let value = pswinput.value.trim();
    let isTrue = true;

    if (value.match(/[0-9]/)) {
        pswinput.parentElement.classList.remove("error1");
        pswinput.parentElement.classList.add("done1");
    } else {
        isTrue = false;
        pswinput.parentElement.classList.add("error1");
        pswinput.parentElement.classList.remove("done1");
    }

    if (value.match(/[!@#$%^&\*\-_\.\\,`~()+=<>"':;\[\]{}/?]/)) {
        pswinput.parentElement.classList.remove("error2");
        pswinput.parentElement.classList.add("done2");
    } else {
        isTrue = false;
        pswinput.parentElement.classList.add("error2");
        pswinput.parentElement.classList.remove("done2");
    }

    if (value.length >= 8) {
        pswinput.parentElement.classList.remove("error3");
        pswinput.parentElement.classList.add("done3");
    } else {
        isTrue = false;
        pswinput.parentElement.classList.add("error3");
        pswinput.parentElement.classList.remove("done3");
    }

    if (value.match(/[A-Z]/)) {
        pswinput.parentElement.classList.remove("error4");
        pswinput.parentElement.classList.add("done4");
    } else {
        isTrue = false;
        pswinput.parentElement.classList.add("error4");
        pswinput.parentElement.classList.remove("done4");
    }

    if (value.match(/[a-z]/)) {
        pswinput.parentElement.classList.remove("error5");
        pswinput.parentElement.classList.add("done5");
    } else {
        isTrue = false;
        pswinput.parentElement.classList.add("error5");
        pswinput.parentElement.classList.remove("done5");
    }

    if (isTrue) {
        pswinput.parentElement.classList.remove("errorbadge");
        pswinput.nextElementSibling.classList.remove("wdanger");
        pswinput.style.border = "2px solid green";
    } else {
        pswinput.nextElementSibling.classList.add("wdanger");
        pswinput.parentElement.classList.add("errorbadge");
        pswinput.style.border = "2px solid red";
    }

    return isTrue;
}

function passwordInput() {
    pswinput.addEventListener("keyup", () => validatePasswordInput());
}
// -------------- Login Form Validation END -------------- //




//! ---------- Form Submission ----------!//
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isNameValid = validateNameInput();
    let isPasswordValid = validatePasswordInput();

    if (isNameValid && isPasswordValid) {
        sendInfos();
    } else {
        Toastify({
            text: "Form not submitted",
            style: {
                background: "red",
            },
            duration: 1000,
        }).showToast();
    }
});


//!--------- SEND INFOS TO SERVER ---------//
async function sendInfos() {
    let username = nameinput.value;
    let password = pswinput.value;
    try {
        const response = await fetch(`http://localhost:3000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            Toastify({
                text: `Welcome, ${nameinput.value}!`,
                style: {
                    background: "green",
                },
                duration: 3000,
            }).showToast();
            setTimeout(() => {
                window.location.href = "../home/index.html";
            }, 2000);
        } else {
            Toastify({
                text: "Username or password is incorrect",
                style: {
                    background: "red",
                },
                duration: 1000,
            }).showToast();
        }
    } catch (error) {
        Toastify({
            text: error,
            style: {
                background: "red",
            },
            duration: 1000,
        }).showToast();
        console.log(error);
    }
}
//--------- SEND INFOS TO SERVER END ---------//


//! ---------- Initialization ----------!//
nameInput();
passwordInput();
showPassword();