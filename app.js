const api = {
  key: "249e0914f0284c25bda121440200410",
  base: "http://api.weatherapi.com/v1",
};
//Selectors
//Burger menu selectors
const burgerBtn = document.querySelector(".burger-menu");
const BurgerMenu = document.querySelector(".top-settings-menu");
const BurgerMenuWrap = document.querySelector(".top-menu-wrap");
//bottom menu selectors
const bottomMainContainer = document.querySelector(
  ".bottom-main-menu-container"
);
const homeBtn = document.querySelector(".fa-home");
const returnBtn = document.querySelector(".fa-chevron-left");
const searchBtn = document.querySelector(".searchActivatorBtn");
const activeSearchBtn = document.querySelector(".activeSearchBtn");
const exploreBtn = document.querySelector(".fa-ellipsis-h");
const exploreWindow = document.querySelector(
  ".bottom-main-menu-container-wrap"
);
const userInput = document.querySelector(".user-input");
//Event listeners
burgerBtn.addEventListener("click", () => {
  BurgerMenu.classList.toggle("active");
  burgerBtn.classList.toggle("active");
  BurgerMenuWrap.classList.toggle("active");
});
exploreBtn.addEventListener("click", () => {
  exploreWindow.classList.toggle("active");
});
searchBtn.addEventListener("click", () => {
  bottomMainContainer.classList.toggle("activeSearch");
});
returnBtn.addEventListener("click", () => {
  bottomMainContainer.classList.toggle("activeSearch");
});
activeSearchBtn.addEventListener("click", getQuery);

//Functions

function getQuery(e) {
  e.preventDefault();
  updateSearch(userInput.value);
}
function updateSearch(query) {
  fetch(`${api.base}/forecast.json?key=${api.key}&q=${query}&days=3`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayForecast);
}
function displayForecast(weather) {
  console.log(weather.forecast);
}
