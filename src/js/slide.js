let btnCloses = document.querySelectorAll(".onboards__btn-close");
let slide = document.querySelector(".onboards__wrapper");
let slides = document.querySelectorAll(".swiper-slide");
let btnCloseNext = document.querySelector(".onboards__btn--close");
let btnFirst = document.querySelector(".onboard__btn--first");
let btnNext = document.querySelector(".onboards__btn--next");
let btnPagination = document.querySelector(".onboards__buttons-nav");
let freeClose = document.querySelector(".onboards");
let activeSlide = document.querySelector(".onboard__slide-active");
let slideList = document.querySelector(".onboards__swiper");
let slideFirst = document.querySelector(".onboard--first");
const onboards = document.querySelector('.onboards');

var onboardSwiper = new Swiper(".onboards__swiper", {
    loop: false,
    centeredSlides: true,
    slidesPerView: 1,
    // breakpoints: {
    //     768: {
    //         width: 701
    //     },
    // },
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

btnFirst.addEventListener ('click', function() {
    slideFirst.classList.add('onboard--fadeout');
});


/*btnFirst.addEventListener("click", function() {
    btnNext.classList.remove("onboards__hide");
    btnPagination.classList.remove("onboards__hide");
    var nextSlide = activeSlide.nextElementSibling;
    activeSlide.classList.remove("onboard__slideActive");
    nextSlide.classList.add("index-slide");
    activeSlide = nextSlide;
});*/


