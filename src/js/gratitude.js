const btnCloseGratitude = document.querySelector(".gratitude__btn-close");
const gratitude = document.querySelector(".gratitude");

btnCloseGratitude.addEventListener ('click', function() {
    gratitude.classList.add('gratitude__hide');
});
