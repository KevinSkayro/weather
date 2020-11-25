const api = {
  key: "249e0914f0284c25bda121440200410",
  base: "http://api.weatherapi.com/v1",
};
//Selectors
//Burger menu selectors
const burgerBtn = document.querySelector(".burger-menu");
const burgerMenu = document.querySelector(".top-settings-menu");
const celsiusBtn = document.querySelector(".celsius");
const fahrenheitBtn = document.querySelector(".fahrenheit");
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
//Main Body selectors day 1
const maincontainer = document.querySelector(".mid-section");
const cityDayOne = document.querySelector(".city-day1");
const stateDayOne = document.querySelector(".state-day1");
const dateDayOne = document.querySelector(".date-day1");
const tempetureDayOne = document.querySelector(".tempeture-day1");
const feelsLikeTempDayOne = document.querySelector(".feels-like-temp-day1");
const weatherConditionDayOne = document.querySelector(".weather-state-day1");
const humidityDayOne = document.querySelector(".humidity-day1");
const pressureDayOne = document.querySelector(".pressure-day1");
const uvIndexDayOne = document.querySelector(".uv-index-day1");
const visibilityDayOne = document.querySelector(".visibility-day1");
const windDayOne = document.querySelector(".wind-day1");
const windDirection = document.querySelector(".wind-dir");

//Event listeners
burgerBtn.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
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

celsiusBtn.addEventListener("click", () => {
  maincontainer.classList.add("celsius");
  celsiusBtn.style.background = "#000";
  celsiusBtn.style.color = "#fff";
  celsiusBtn.style.border = "none";
  fahrenheitBtn.style.background = "#fff";
  fahrenheitBtn.style.color = "#000";
  fahrenheitBtn.style.border = "1px solid #000";
  updateSearch(city.innerText);
});
fahrenheitBtn.addEventListener("click", () => {
  fahrenheitBtn.style.background = "#000";
  fahrenheitBtn.style.color = "#fff";
  fahrenheitBtn.style.border = "none";
  celsiusBtn.style.background = "#fff";
  celsiusBtn.style.color = "#000";
  celsiusBtn.style.border = "1px solid #000";
  maincontainer.classList.remove("celsius");
  updateSearch(city.innerText);
});
//Functions

function getQuery(e) {
  e.preventDefault();
  updateSearch(userInput.value);
}
(function getIp() {
  const successCallback = (position) => {
    updateSearch(`${position.coords.latitude}, ${position.coords.longitude}`);
  };
  const errorCallback = (error) => {
    console.error(error);
    feelsLikeTemp.innerHTML = "User denied location";
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
})();
function updateSearch(query) {
  fetch(`${api.base}/forecast.json?key=${api.key}&q=${query}&days=3`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayForecast);
}
function displayForecast(weather) {
  console.log(weather);
  cityDayOne.innerText = `${weather.location.name}`;
  stateDayOne.innerText = `${weather.location.region}`;
  dateDayOne.innerText = `${weather.forecast.forecastday[0].date}`;
  if (maincontainer.classList.contains("celsius")) {
    tempetureDayOne.innerHTML = `${Math.round(weather.current.temp_c)}&deg;C`;
    feelsLikeTempDayOne.innerHTML = `Feels like ${Math.round(
      weather.current.feelslike_c
    )}&deg;C`;
    pressureDayOne.innerText = `${weather.current.pressure_mb}mBar`;
    visibilityDayOne.innerText = `${weather.current.vis_km} km`;
    windDayOne.innerText = `${weather.current.wind_kph} km/h`;
  } else {
    tempetureDayOne.innerHTML = `${Math.round(weather.current.temp_f)}&deg;F`;
    feelsLikeTempDayOne.innerHTML = `Feels like ${Math.round(
      weather.current.feelslike_f
    )}&deg;F`;
    pressureDayOne.innerText = `${weather.current.pressure_in}inHg`;
    visibilityDayOne.innerText = `${weather.current.vis_miles} mi`;
    windDayOne.innerText = `${weather.current.wind_mph} mph`;
  }
  weatherConditionDayOne.innerHTML = `<img src="${weather.current.condition.icon}" alt="weather state icon"/> ${weather.current.condition.text}`;
  humidityDayOne.innerText = `${weather.current.humidity}%`;

  if (weather.current.uv < 3) {
    uvIndexDayOne.innerText = `Low, ${weather.current.uv}`;
  } else if (weather.current.uv < 6) {
    uvIndexDayOne.innerText = `Moderate, ${weather.current.uv}`;
  } else if (weather.current.uv < 8) {
    uvIndexDayOne.innerText = `High, ${weather.current.uv}`;
  } else if (weather.current.uv < 11) {
    uvIndexDayOne.innerText = `Very High, ${weather.current.uv}`;
  } else if (weather.current.uv > 11) {
    uvIndexDayOne.innerText = `Extreme, ${weather.current.uv}`;
  }

  switch (weather.current.wind_dir) {
    case "N":
      windDirection.innerText = "North";
      break;
    case "NNE":
      windDirection.innerText = "North North East";
      break;
    case "NE":
      windDirection.innerText = "North East";
      break;
    case "E":
      windDirection.innerText = "East";
      break;
    case "ESE":
      windDirection.innerText = "East South East";
      break;
    case "SE":
      windDirection.innerText = "South East";
      break;
    case "SSE":
      windDirection.innerText = "South South East";
      break;
    case "S":
      windDirection.innerText = "South";
      break;
    case "SSW":
      windDirection.innerText = "South South West";
      break;
    case "SW":
      windDirection.innerText = "South West";
      break;
    case "WSW":
      windDirection.innerText = "West South West";
      break;
    case "W":
      windDirection.innerText = "West";
      break;
    case "WNW":
      windDirection.innerText = "West North West";
      break;
    case "NW":
      windDirection.innerText = "North West";
      break;
    case "NNW":
      windDirection.innerText = "North North West";
      break;
  }

  //weather preview on explore btn

  bottomMainContainer.classList.remove("activeSearch");
  userInput.value = "";
}
function displaytest(weather) {
  console.log(weather);
}
