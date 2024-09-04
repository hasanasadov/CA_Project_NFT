const nameinput = document.querySelector("#namediv input");
const emailinput = document.querySelector("#emaildiv input");
const pswinput = document.querySelector("#pswdiv input");
const repswinput = document.querySelector("#repswdiv input");
const form = document.querySelector("form");

//!--------- FUNCTIONS ---------!//


//!--------- SHOW PASSWORD
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

//!--------- SHOW REPASSWORD
function showRePassword() {
    let icon2 = document.querySelector("#repswdiv i");
    let input2 = document.querySelector("#repswdiv input");
    icon2.addEventListener("click", () => {
        if (input2.type === "password") {
            input2.type = "text";
            icon2.classList.remove("fa-eye-slash");
            icon2.classList.add("fa-eye");
        } else {
            input2.type = "password";
            icon2.classList.remove("fa-eye");
            icon2.classList.add("fa-eye-slash");
        }
    });
}

//!--------- USERNAME INPUT VALIDATION
function nameInput() {
    nameinput.addEventListener("keyup", (e) => {
        let value = e.target.value.trim();
        let isTrue = true;
        if (value.length >= 3) {
            nameinput.style.border = "2px solid green";
            nameinput.parentElement.classList.add("done6");
            nameinput.parentElement.classList.remove("error6");
            nameinput.parentElement.classList.remove("errorbadge");
        } else {
            nameinput.style.border = "2px solid red";
            nameinput.parentElement.classList.add("error6");
            nameinput.parentElement.classList.remove("done6");
            nameinput.parentElement.classList.add("errorbadge");
            isTrue = false;
        }
        return isTrue;
    });
}


//!--------- EMAIL INPUT VALIDATION
function emailInput() {
    emailinput.addEventListener("keyup", (e) => {
        let value = e.target.value.trim();
        let isTrue = true;
        if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            emailinput.style.border = "2px solid green";
            emailinput.parentElement.classList.remove("error8");
            emailinput.parentElement.classList.remove("errorbadge");
            emailinput.parentElement.classList.add("done8");
        } else {
            emailinput.style.border = "2px solid red";
            emailinput.parentElement.classList.add("error8");
            emailinput.parentElement.classList.remove("done8");
            emailinput.parentElement.classList.add("errorbadge");
            isTrue = false;
        }
        return isTrue;
    });
}

//!--------- PASSWORD INPUT VALIDATION
function passwordInput() {
    pswinput.addEventListener("keyup", (e) => {
        let value = e.target.value.trim();
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
            pswinput.style.border = "2px solid red";
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
            pswinput.style.border = "2px solid green";
            pswinput.parentElement.classList.remove("errorbadge");
            pswinput.nextElementSibling.classList.remove("wdanger");
        } else {
            pswinput.nextElementSibling.classList.add("wdanger");
            pswinput.parentElement.classList.add("errorbadge");
            pswinput.style.border = "2px solid red";
        }

        return isTrue;
    });
}

//!--------- RE-PASSWORD INPUT VALIDATION
function rePasswordInput() {
    repswinput.addEventListener("keyup", (e) => {
        let value = pswinput.value.trim();
        let psw = e.target.value.trim();
        let isTrue = true;
        if (value == psw && psw.length > 0) {
            repswinput.style.border = "2px solid green";
            repswinput.parentElement.classList.remove("error7");
            repswinput.parentElement.classList.remove("errorbadge");
            repswinput.parentElement.classList.add("done7");
            repswinput.nextElementSibling.classList.remove("wdanger");
        } else {
            repswinput.style.border = "2px solid red";
            repswinput.parentElement.classList.remove("done7");
            repswinput.parentElement.classList.add("error7");
            repswinput.parentElement.classList.add("errorbadge");
            repswinput.nextElementSibling.classList.add("wdanger");
            isTrue = false;
        }
        return isTrue;
    });
}


//!--------- FORM SUBMISSION ----------!//
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isTrue = true;
    if (nameInput() == false || nameinput.value.length === 0 ) {
        console.log(nameinput.value);
        isTrue = false;
    }
    if (emailInput() == false || emailinput.value.length === 0) {
        isTrue = false;
    }
    if (passwordInput() == false || pswinput.value.length === 0) {
        isTrue = false;
    }
    if (rePasswordInput() == false || repswinput.value.length === 0) {
        isTrue = false;
    }
    if (isTrue) {
        form.submit();
        alert("Form submitted successfully");
    }else{
        alert("Form not submitted");
    }
});





//! ---------- Initialization ----------!//
nameInput();

emailInput();
passwordInput();
showPassword();

rePasswordInput();
showRePassword();