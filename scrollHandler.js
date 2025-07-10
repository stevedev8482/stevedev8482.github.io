class ScrollHandler {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.currentSection = 0;
        this.isScrolling = false;
        this.throttleTimeout = null;

        this.init();
    }

    init() {
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        window.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });

        // Инициализация позиции
        this.scrollToSection(0);
    }

    handleWheel(e) {
        if (this.isScrolling) return;

        // Отменяем стандартное поведение
        e.preventDefault();

        // Определяем направление скролла
        const direction = e.deltaY > 0 ? 1 : -1;

        this.navigateSections(direction);
    }

    handleKeyDown(e) {
        if (this.isScrolling) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateSections(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateSections(-1);
        }
    }

    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchEnd(e) {
        if (!this.touchStartY || this.isScrolling) return;

        const touchEndY = e.changedTouches[0].clientY;
        const diff = this.touchStartY - touchEndY;

        // Если свайп достаточно большой
        if (Math.abs(diff) > 50) {
            const direction = diff > 0 ? 1 : -1;
            this.navigateSections(direction);
        }
    }

    navigateSections(direction) {
        if (this.isScrolling) return;

        const nextSection = this.currentSection + direction;

        if (nextSection >= 0 && nextSection < this.sections.length) {
            this.currentSection = nextSection;
            this.scrollToSection(this.currentSection);
        }
    }

    scrollToSection(index) {
        this.isScrolling = true;

        this.sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Сбрасываем флаг после завершения анимации
        clearTimeout(this.throttleTimeout);
        this.throttleTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ScrollHandler();
});