(function() {
    'use strict';

    const btnCloses = document.querySelectorAll(".onboards__btn-close");
    const slides = document.querySelectorAll(".swiper-slide");
    const btnCloseNext = document.querySelector(".onboards__btn--close");
    const btnFirst = document.querySelector(".onboard__btn--first");
    const btnNext = document.querySelector(".onboards__btn--next");
    const slideFirst = document.querySelector(".onboard--first");
    const onboards = document.querySelector('.onboards');

    const onboardSwiper = new Swiper(".onboards__swiper", {
        loop: false,
        centeredSlides: true,
        slidesPerView: 1,
        resistanceRatio: 0,
        pagination: {
            el: '.onboards__buttons-nav',
            type: 'bullets',
            bulletElement: 'button',
            bulletClass: 'onboards__btn-nav',
            bulletActiveClass: 'onboards__btn-nav--active',
            clickable: true,
        },
        navigation: {
            nextEl: '.onboard__swiper-next',
        },
    });

    const onboardsPointerUpHandler = function(e) {
        e.preventDefault();
        if (e.target === onboards) {
            onboards.classList.add('onboards__hide');
            onboards.removeEventListener('pointerup', onboardsPointerUpHandler);
        }
    };

    onboards.addEventListener('pointerdown', function(e) {
        e.preventDefault();
        if (e.target === onboards) {
            onboards.addEventListener('pointerup', onboardsPointerUpHandler);
        }
    });

    btnCloses.forEach(function(btnClose, i, btnCloses) {
        btnClose.addEventListener ('click', function() {
            onboards.classList.add('onboards__hide');
        });
    });

    btnCloseNext.addEventListener ('click', function() {
        onboards.classList.add('onboards__hide');
    });

    btnFirst.addEventListener ('click', function() {
        slideFirst.classList.add('onboard--fadeout');
    });

    onboardSwiper.on('reachEnd', function () {
        btnCloseNext.classList.remove('onboards__hide');
        btnNext.classList.add('onboards__hide');
    });

    onboardSwiper.on('slidePrevTransitionStart', function (e) {
        if (e.realIndex === slides.length - 2) {
            btnCloseNext.classList.add('onboards__hide');
            btnNext.classList.remove('onboards__hide');
        }
    });
})();
