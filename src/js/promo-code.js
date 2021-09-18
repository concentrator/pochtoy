const btnClosePromo = document.querySelector(".promo-code__btn-close");
const PromoCode = document.querySelector(".promo-code");

btnClosePromo.addEventListener ('click', function() {
    PromoCode.classList.add('promo-code__hide');
});
