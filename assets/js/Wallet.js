const carousel = document.querySelector('#carousel');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-btn-prev');
    const nextBtn = carousel.querySelector('.carousel-btn-next');

    let currentIndex = 0;

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.style.display = 'none';
            item.classList.remove('active');
        });

        carouselItems[currentIndex].style.display = 'block';
        carouselItems[currentIndex].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < carouselItems.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    });

    updateCarousel();