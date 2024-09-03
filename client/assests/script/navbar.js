const sideNav = document.querySelector('.sidebar');
const hamburger = document.querySelector('.nav-right-burger');
const closeBurger = document.querySelector('#burger-close');
hamburger.addEventListener('click', () => {
    sideNav.classList.add('open');
    sideNav.classList.remove('close');
});

closeBurger.addEventListener('click', () => {
    sideNav.classList.add('close');
    sideNav.classList.remove('open');
});