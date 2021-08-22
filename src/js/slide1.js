const itemSlide = document.querySelectorAll(".onboard__slide-switching");
const dots = document.querySelectorAll(".onboard__btn-nav");
let btnNext = document.querySelector(".onboard__btn--next");
const btnFirst = document.querySelector(".onboard__btn--first");
const btnsNav = document.querySelector(".onboard__buttons-nav");
let slideFirst = document.querySelector(".onboard__slide--first");
let activeDot = document.querySelector(".onboard__btn-nav--active");
let activeSlide = document.querySelector(".onboard__slide-active");

for (let i = 0; i < itemSlide.length; i++) {

  dots[i].addEventListener("click", function(e) {

    if (e.target.classList.contains("onboard__btn-nav--active")) {
      return
    };

    activeDot.classList.remove("onboard__btn-nav--active");
    e.target.classList.add("onboard__btn-nav--active");
    activeDot = e.target;
    activeSlide.classList.remove("onboard__slide-active");
    itemSlide[i].classList.add("onboard__slide-active");
    activeSlide = itemSlide[i];
  });

};

btnFirst.addEventListener ("click", function () {
    slideFirst.classList.add("onboard__hide");
    btnNext.classList.remove("onboard__hide");
    btnsNav.classList.remove("onboard__hide");
    itemSlide[0].classList.add("onboard__slide-active");
    activeSlide = itemSlide[0];
});

btnNext.addEventListener ("click", function () {
  var nextSlide = activeSlide.nextElementSibling;
  if (!nextSlide) {
    activeSlide.classList.remove("onboard__slide-active");
    itemSlide[0].classList.add("onboard__slide-active");
    activeSlide = itemSlide[0];
    activeDot.classList.remove("onboard__btn-nav--active");
    dots[0].classList.add("onboard__btn-nav--active");
    activeDot = dots[0];
  } else {
    activeSlide.classList.remove("onboard__slide-active");
    nextSlide.classList.add("onboard__slide-active");
    activeSlide = nextSlide;
    var nextDot = activeDot.nextElementSibling;
    nextDot.classList.add("onboard__btn-nav--active");
    activeDot.classList.remove("onboard__btn-nav--active");
    activeDot = nextDot;
  }
});
