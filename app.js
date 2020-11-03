//Selectors
const burgerBtn = document.querySelector(".burger-menu");
const BurgerMenu = document.querySelector(".top-settings-menu");
//Event listeners
burgerBtn.addEventListener("click", () => {
  BurgerMenu.classList.toggle("active");
  burgerBtn.classList.toggle("active");
});
//Functions
