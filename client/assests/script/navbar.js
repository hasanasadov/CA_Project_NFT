const sideNav = document.querySelector('.sidebar');
const hamburger = document.querySelector('.nav-right-burger');
const closeBurger = document.querySelector('#burger-close');


//! -------------------- Sidebar -------------------- //
hamburger.addEventListener('click', () => {
    sideNav.classList.add('open');
    sideNav.classList.remove('close');
    document.body.classList.add('wsidebar');
});

closeBurger.addEventListener('click', () => {
    document.body.classList.remove('wsidebar');
    sideNav.classList.add('close');
    sideNav.classList.remove('open');
});
//! -------------------- Sidebar END -------------------- //