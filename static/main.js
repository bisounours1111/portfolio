var menu_icon = document.getElementById('menu-icon');
var menu = document.getElementById('navbar');
childs = menu.querySelectorAll('a');
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

childs.forEach(function (child) {
    child.addEventListener('click', function () {
        if (window.innerWidth < 1200) {
            menu_icon.classList.toggle('bx-x');
            menu.classList.toggle('active');
        }

        var target = child.getAttribute('href');
        var targetElement = document.querySelector(target);
        var headerHeight = document.querySelector('header').offsetHeight; // Obtenir la hauteur du header
        var offset = headerHeight; // Ajouter l'offset du header à votre offset existant
        var startPosition = window.pageYOffset; // Soustraire la hauteur du header
        var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        var distance = targetPosition - startPosition;
        var duration = 1000;
        var start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            var timeElapsed = currentTime - start;
            var offsetPosition = startPosition + distance * ease(timeElapsed, 0, 1, duration);
            var run = offsetPosition;
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    });
});