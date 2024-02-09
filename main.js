var menu_icon = document.getElementById('menu-icon');
var menu = document.getElementById('navbar');

menu_icon.addEventListener('click', function () {
    menu_icon.classList.toggle('bx-x');
    menu.classList.toggle('active');
});