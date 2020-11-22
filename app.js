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
//Main Body selectors
const maincontainer = document.querySelector(".mid-section");
const city = document.querySelector(".city");
const state = document.querySelector(".state");
const date = document.querySelector(".date");
const tempeture = document.querySelector(".tempeture");
const feelsLikeTemp = document.querySelector(".feels-like-temp");
const weatherCondition = document.querySelector(".weather-state-container");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const uvIndex = document.querySelector(".uv-index");
const visibility = document.querySelector(".visibility");
const wind = document.querySelector(".wind");
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
  city.innerText = `${weather.location.name}`;
  state.innerText = `${weather.location.region}`;
  date.innerText = `${weather.forecast.forecastday[0].date}`;
  if (maincontainer.classList.contains("celsius")) {
    tempeture.innerHTML = `${Math.round(weather.current.temp_c)}&deg;C`;
    feelsLikeTemp.innerHTML = `Feels like ${Math.round(
      weather.current.feelslike_c
    )}&deg;C`;
    pressure.innerText = `${weather.current.pressure_mb}mBar`;
    visibility.innerText = `${weather.current.vis_km} km`;
    wind.innerText = `${weather.current.wind_kph} km/h`;
  } else {
    tempeture.innerHTML = `${Math.round(weather.current.temp_f)}&deg;F`;
    feelsLikeTemp.innerHTML = `Feels like ${Math.round(
      weather.current.feelslike_f
    )}&deg;F`;
    pressure.innerText = `${weather.current.pressure_in}inHg`;
    visibility.innerText = `${weather.current.vis_miles} mi`;
    wind.innerText = `${weather.current.wind_mph} mph`;
  }
  weatherCondition.innerHTML = `<img src="${weather.current.condition.icon}" alt="weather state icon"/> ${weather.current.condition.text}`;
  humidity.innerText = `${weather.current.humidity}%`;

  if (weather.current.uv < 3) {
    uvIndex.innerText = `Low, ${weather.current.uv}`;
  } else if (weather.current.uv < 6) {
    uvIndex.innerText = `Moderate, ${weather.current.uv}`;
  } else if (weather.current.uv < 8) {
    uvIndex.innerText = `High, ${weather.current.uv}`;
  } else if (weather.current.uv < 11) {
    uvIndex.innerText = `Very High, ${weather.current.uv}`;
  } else if (weather.current.uv > 11) {
    uvIndex.innerText = `Extreme, ${weather.current.uv}`;
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
