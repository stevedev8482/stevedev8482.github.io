document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => observer.observe(el));

    // Работа с отзывами
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviewsContainer');

    // Загрузка отзывов из Local Storage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewsContainer.innerHTML = '';

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';
            reviewElement.innerHTML = `
                <div class="review-author">${review.name}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }

    // Сохранение отзыва
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('reviewName').value.trim();
        const text = document.getElementById('reviewText').value.trim();

        if (name && text) {
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            const newReview = {
                name,
                text,
                date: new Date().toISOString()
            };

            reviews.unshift(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            loadReviews();
            reviewForm.reset();
        }
    });

    // Первоначальная загрузка отзывов
    loadReviews();
});