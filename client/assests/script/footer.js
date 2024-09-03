const form2 = document.querySelector(".form-footer");
const footer_email = form2.querySelector("input");


function footeremail() {
    footer_email.addEventListener("keyup", (e) => {
        let value = e.target.value.trim();
        let isTrue = true;
        if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            footer_email.parentElement.classList.remove("error8");
            footer_email.parentElement.classList.add("done8");
        } else {
            footer_email.parentElement.classList.add("error8");
            footer_email.parentElement.classList.remove("done8");
            isTrue = false;
        }
        return isTrue;
    });
}

form2.addEventListener("submit", (e) => {
    e.preventDefault();
    let isTrue = true;
    if (footeremail() == false || footer_email.value.length === 0) {
        isTrue = false;
    }
    if (isTrue) {
        form2.submit();
        alert("Form submitted successfully");
    }else{
        alert("Form not submitted");
    }
});

footeremail()
