// Анимации при скролле
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');

    // Инициализация Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Наблюдаем за всеми анимированными элементами
    animatedElements.forEach(el => observer.observe(el));

    // Параллакс эффект для фона
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax'));
            const yPos = -(scrollPosition * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
});