var menu_icon = document.getElementById('menu-icon');
var menu = document.getElementById('navbar');
var currentSlide = 0;
var slides = document.querySelectorAll('.projects .content');

menu_icon.addEventListener('click', function () {
    menu_icon.classList.toggle('bx-x');
    menu.classList.toggle('active');
});

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlidePosition();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlidePosition();
}

function updateSlidePosition() {
    var offset = -currentSlide * 100; // Décalage pour la nouvelle position de la diapositive
    document.querySelector('.projects .slides').style.transform = 'translateX(' + offset + '%)';
}