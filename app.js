const api = {
  key: "249e0914f0284c25bda121440200410",
  base: "http://api.weatherapi.com/v1",
};
//Selectors
//Burger menu selectors
const burgerBtn = document.querySelector(".burger-menu");
const BurgerMenu = document.querySelector(".top-settings-menu");
//Bottom menu selectors
const bottomMainContainer = document.querySelector(
  ".bottom-main-menu-container"
);
const homeBtn = document.querySelector(".fa-home");
const returnBtn = document.querySelector(".fa-chevron-left");
const searchBtn = document.querySelector(".search-activator-btn");
const activeSearchBtn = document.querySelector(".active-search-btn");
const exploreBtn = document.querySelector(".fa-ellipsis-h");
const exploreWindow = document.querySelector(
  ".bottom-main-menu-container-wrap"
);
const userInput = document.querySelector(".user-input");
//Main Body selectors
const city = document.querySelector(".city");
const state = document.querySelector(".state");
const date = document.querySelector(".date");
const tempeture = document.querySelector(".tempeture");
const feelsLikeTemp = document.querySelector(".feels-like-temp");
const weatherCondition = document.querySelector(".weather-state-container");

//Event listeners
burgerBtn.addEventListener("click", () => {
  BurgerMenu.classList.toggle("active");
  burgerBtn.classList.toggle("active");
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
  console.log(weather);
  city.innerText = `${weather.location.name}`;
  state.innerText = `${weather.location.region}`;
  date.innerText = `${weather.forecast.forecastday[0].date}`;
  tempeture.innerHTML = `${Math.round(weather.current.temp_f)}&deg;F`;
  feelsLikeTemp.innerHTML = `Feels like ${Math.round(
    weather.current.feelslike_f
  )}&deg;F`;
  weatherCondition.innerHTML = `<img src="${weather.current.condition.icon}" alt="weather state icon"/> ${weather.current.condition.text}`;
  bottomMainContainer.classList.toggle("activeSearch");
  userInput.value = "";
}
