let btnCloses = document.querySelectorAll(".onboards__close");
let slide = document.querySelector(".onboards__wrapper");
let slides = document.querySelectorAll(".swiper-slide");
let btnCloseNext = document.querySelector(".onboards__btn--close");
let btnFirst = document.querySelector(".onboard__btn--first");
let btnNext = document.querySelector(".onboards__btn--next");
let btnPagination = document.querySelector(".onboards__buttons-nav");
let freeClose = document.querySelector(".onboards");
let activeSlide = document.querySelector(".onboard__slide-active");

var onboardSwiper = new Swiper(".onboards__swiper", {
    loop: true,
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

for (btnClose of btnCloses) {
    btnClose.addEventListener("click", function() {
        freeClose.classList.add("onboards__hide");
    });
};

btnFirst.addEventListener("click", function() {
    btnNext.classList.remove("onboards__hide");
    btnPagination.classList.remove("onboards__hide");
    var nextSlide = activeSlide.nextElementSibling;
    activeSlide.classList.remove("onboard__slideActive");
    nextSlide.classList.add("index-slide");
    activeSlide = nextSlide;
});

slide.addEventListener("click", function(e) {
    e.stopPropagation();
});


btnNext.addEventListener ("click", function () {
    var nextSlide = activeSlide.nextElementSibling;
    activeSlide.classList.remove("onboard__slideActive");
    nextSlide.classList.add("index-slide");
    activeSlide = nextSlide;
    nextSlide = activeSlide.nextElementSibling;
    if (!nextSlide) {
        btnNext.classList.add("onboards__hide");
        btnCloseNext.classList.remove("onboards__hide");
    }
});
