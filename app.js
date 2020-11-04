//Selectors
//Burger menu selectors
const burgerBtn = document.querySelector(".burger-menu");
const BurgerMenu = document.querySelector(".top-settings-menu");
const BurgerMenuWrap = document.querySelector(".top-menu-wrap");
//bottom menu selectors
const homeBtn = document.querySelector(".fa-home");
const searchBtn = document.querySelector(".fa-search");
const exploreBtn = document.querySelector(".fa-ellipsis-h");
const exploreWindow = document.querySelector(
  ".bottom-main-menu-container-wrap"
);
//Event listeners
burgerBtn.addEventListener("click", () => {
  BurgerMenu.classList.toggle("active");
  burgerBtn.classList.toggle("active");
  BurgerMenuWrap.classList.toggle("active");
});
exploreBtn.addEventListener("click", () => {
  exploreWindow.classList.toggle("active");
});
//Functions
