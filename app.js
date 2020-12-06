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

//Weather preview selectors
const PrevDayOne = document.querySelector(".prev-day1");
const PrevDayOneSecOne = document.querySelector(".prev-day1-sec1");
const PrevDayOneSecTwo = document.querySelector(".prev-day1-sec2");
const PrevDayTwo = document.querySelector(".prev-day2");
const PrevDayTwoSecOne = document.querySelector(".prev-day2-sec1");
const PrevDayTwoSecTwo = document.querySelector(".prev-day2-sec2");
const PrevDayThree = document.querySelector(".prev-day3");
const PrevDayThreeSecOne = document.querySelector(".prev-day3-sec1");
const PrevDayThreeSecTwo = document.querySelector(".prev-day3-sec2");

//Main Body selectors
const mainContainer = document.querySelector(".main-container");
const midContainer = document.querySelectorAll(".mid-section");
const dayOne = document.querySelector(".day1");
const dayTwo = document.querySelector(".day2");
const dayThree = document.querySelector(".day3");

//Day one selectors
const cityDayOne = document.querySelector(".city-day1");
const stateDayOne = document.querySelector(".state-day1");
const countryDayOne = document.querySelector(".country-day1");
const dateDayOne = document.querySelector(".date-day1");
const maxMinTempDayOne = document.querySelector(".max-min-temp-day1");
const tempetureDayOne = document.querySelector(".tempeture-day1");
const feelsLikeTempDayOne = document.querySelector(".feels-like-temp-day1");
const weatherConditionDayOne = document.querySelector(".weather-state-day1");
const humidityDayOne = document.querySelector(".humidity-day1");
const pressureDayOne = document.querySelector(".pressure-day1");
const uvIndexDayOne = document.querySelector(".uv-index-day1");
const visibilityDayOne = document.querySelector(".visibility-day1");
const windDayOne = document.querySelector(".wind-day1");
const windDirection = document.querySelector(".wind-dir");

//Day two selectors
const cityDayTwo = document.querySelector(".city-day2");
const stateDayTwo = document.querySelector(".state-day2");
const countryDayTwo = document.querySelector(".country-day2");
const dateDayTwo = document.querySelector(".date-day2");
const maxMinTempDayTwo = document.querySelector(".max-min-temp-day2");
const tempetureDayTwo = document.querySelector(".tempeture-day2");
const weatherConditionDayTwo = document.querySelector(".weather-state-day2");
const humidityDayTwo = document.querySelector(".humidity-day2");
const uvIndexDayTwo = document.querySelector(".uv-index-day2");
const visibilityDayTwo = document.querySelector(".visibility-day2");
const windDayTwo = document.querySelector(".wind-day2");

//Day three selectors
const cityDayThree = document.querySelector(".city-day3");
const stateDayThree = document.querySelector(".state-day3");
const countryDayThree = document.querySelector(".country-day3");
const dateDayThree = document.querySelector(".date-day3");
const maxMinTempDayThree = document.querySelector(".max-min-temp-day3");
const tempetureDayThree = document.querySelector(".tempeture-day3");
const weatherConditionDayThree = document.querySelector(".weather-state-day3");
const humidityDayThree = document.querySelector(".humidity-day3");
const uvIndexDayThree = document.querySelector(".uv-index-day3");
const visibilityDayThree = document.querySelector(".visibility-day3");
const windDayThree = document.querySelector(".wind-day3");

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
  mainContainer.classList.add("celsius");
  celsiusBtn.style.background = "#000";
  celsiusBtn.style.color = "#fff";
  celsiusBtn.style.border = "none";
  fahrenheitBtn.style.background = "#fff";
  fahrenheitBtn.style.color = "#000";
  fahrenheitBtn.style.border = "1px solid #000";
  updateSearch(cityDayOne.innerText);
});

fahrenheitBtn.addEventListener("click", () => {
  fahrenheitBtn.style.background = "#000";
  fahrenheitBtn.style.color = "#fff";
  fahrenheitBtn.style.border = "none";
  celsiusBtn.style.background = "#fff";
  celsiusBtn.style.color = "#000";
  celsiusBtn.style.border = "1px solid #000";
  mainContainer.classList.remove("celsius");
  updateSearch(cityDayOne.innerText);
});

PrevDayOne.addEventListener("click", () => {
  checkForSelectedDay();
  dayOne.classList.add("active");
});

PrevDayTwo.addEventListener("click", () => {
  checkForSelectedDay();
  dayTwo.classList.add("active");
});

PrevDayThree.addEventListener("click", () => {
  checkForSelectedDay();
  dayThree.classList.add("active");
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
    .then(masterfunc);
}

function checkForSelectedDay() {
  midContainer.forEach((day) => {
    if (day.classList.contains("active")) {
      day.classList.remove("active");
    }
  });
}

function masterfunc(weather) {
  displayPreview(weather);
  displayForecastDayOne(weather);
  displayForecastDayTwo(weather);
  displayForecastDayThree(weather);
}

//weather preview on explore btn
function displayPreview(weather) {
  PrevDayOneSecOne.innerHTML = `<span>Today</span> <span>${weather.current.condition.text}</span>`;
  PrevDayTwoSecOne.innerHTML = `<span>${weather.forecast.forecastday[1].date}</span> <span>${weather.forecast.forecastday[1].day.condition.text}</span>`;
  PrevDayThreeSecOne.innerHTML = `<span>${weather.forecast.forecastday[2].date}</span> <span>${weather.forecast.forecastday[2].day.condition.text}</span>`;

  if (mainContainer.classList.contains("celsius")) {
    PrevDayOneSecTwo.innerHTML = `<img src="${
      weather.current.condition.icon
    }"/> <div><span>${Math.round(
      weather.forecast.forecastday[0].day.maxtemp_c
    )}&deg;C</span><span>${Math.round(
      weather.forecast.forecastday[0].day.mintemp_c
    )}&deg;C</span></div>`;

    PrevDayTwoSecTwo.innerHTML = `<img src="${
      weather.forecast.forecastday[1].day.condition.icon
    }"/> <div><span>${Math.round(
      weather.forecast.forecastday[1].day.maxtemp_c
    )}&deg;C</span><span>${Math.round(
      weather.forecast.forecastday[1].day.mintemp_c
    )}&deg;C</span></div>`;

    PrevDayThreeSecTwo.innerHTML = `<img src="${
      weather.forecast.forecastday[2].day.condition.icon
    }"/> <div><span>${Math.round(
      weather.forecast.forecastday[2].day.maxtemp_c
    )}&deg;C</span><span>${Math.round(
      weather.forecast.forecastday[2].day.mintemp_c
    )}&deg;C</span></div>`;
  } else {
    PrevDayOneSecTwo.innerHTML = `<img src="${
      weather.current.condition.icon
    }"/> <div><span>${Math.round(
      weather.forecast.forecastday[0].day.maxtemp_f
    )}&deg;F</span>
    <span>${Math.round(
      weather.forecast.forecastday[0].day.mintemp_f
    )}&deg;F</span></div>`;

    PrevDayTwoSecTwo.innerHTML = `<img src="${
      weather.forecast.forecastday[1].day.condition.icon
    }"/> <div><span>${Math.round(
      weather.forecast.forecastday[1].day.maxtemp_f
    )}&deg;F</span><span>${Math.round(
      weather.forecast.forecastday[1].day.mintemp_f
    )}&deg;F</span></div>`;

    PrevDayThreeSecTwo.innerHTML = `<img src="${
      weather.forecast.forecastday[2].day.condition.icon
    }"/> <div><span>${Math.round(
      weather.forecast.forecastday[2].day.maxtemp_f
    )}&deg;F</span><span>${Math.round(
      weather.forecast.forecastday[2].day.mintemp_f
    )}&deg;F</span></div>`;
  }
}
//display day 1 aka today
function displayForecastDayOne(weather) {
  console.log(weather);
  cityDayOne.innerText = `${weather.location.name}`;
  stateDayOne.innerText = `${weather.location.region}`;
  countryDayOne.innerText = `${weather.location.country}`;
  dateDayOne.innerText = `${weather.forecast.forecastday[0].date}`;

  if (mainContainer.classList.contains("celsius")) {
    maxMinTempDayOne.innerHTML = `<span class="bold">${Math.round(
      weather.forecast.forecastday[0].day.maxtemp_c
    )} &deg;C&uarr;</span>  ${Math.round(
      weather.forecast.forecastday[0].day.mintemp_c
    )}&deg;C&darr;`;
    tempetureDayOne.innerHTML = `${Math.round(weather.current.temp_c)}&deg;C`;
    feelsLikeTempDayOne.innerHTML = `Feels like ${Math.round(
      weather.current.feelslike_c
    )}&deg;C`;
    pressureDayOne.innerText = `${weather.current.pressure_mb}mBar`;
    visibilityDayOne.innerText = `${weather.current.vis_km} km`;
    windDayOne.innerText = `${weather.current.wind_kph} km/h`;
  } else {
    maxMinTempDayOne.innerHTML = `<span class="bold">${Math.round(
      weather.forecast.forecastday[0].day.maxtemp_f
    )} &deg;F&uarr;</span>  ${Math.round(
      weather.forecast.forecastday[0].day.mintemp_f
    )}&deg;F&darr;`;
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

  bottomMainContainer.classList.remove("activeSearch");
  userInput.value = "";
}

//display day 2
function displayForecastDayTwo(weather) {
  cityDayTwo.innerText = `${weather.location.name}`;
  stateDayTwo.innerText = `${weather.location.region}`;
  countryDayTwo.innerText = `${weather.location.country}`;
  dateDayTwo.innerText = `${weather.forecast.forecastday[1].date}`;

  if (mainContainer.classList.contains("celsius")) {
    maxMinTempDayTwo.innerHTML = `<span class="bold">${Math.round(
      weather.forecast.forecastday[1].day.maxtemp_c
    )} &deg;C&uarr;</span>  ${Math.round(
      weather.forecast.forecastday[1].day.mintemp_c
    )}&deg;C&darr;`;
    tempetureDayTwo.innerHTML = `${Math.round(
      weather.forecast.forecastday[1].day.avgtemp_c
    )}&deg;C`;
    visibilityDayTwo.innerText = `${weather.forecast.forecastday[1].day.avgvis_km} km`;
    windDayTwo.innerText = `${weather.forecast.forecastday[1].day.maxwind_kph} km/h`;
  } else {
    maxMinTempDayTwo.innerHTML = `<span class="bold">${Math.round(
      weather.forecast.forecastday[1].day.maxtemp_f
    )} &deg;F&uarr;</span>  ${Math.round(
      weather.forecast.forecastday[1].day.mintemp_f
    )}&deg;F&darr;`;
    tempetureDayTwo.innerHTML = `${Math.round(
      weather.forecast.forecastday[1].day.avgtemp_f
    )}&deg;F`;
    visibilityDayTwo.innerText = `${weather.forecast.forecastday[1].day.avgvis_miles} mi`;
    windDayTwo.innerText = `${Math.round(
      weather.forecast.forecastday[1].day.maxwind_mph
    )} mph`;
  }

  weatherConditionDayTwo.innerHTML = `<img src="${weather.forecast.forecastday[1].day.condition.icon}" alt="weather state icon"/> ${weather.forecast.forecastday[1].day.condition.text}`;
  humidityDayTwo.innerText = `${weather.forecast.forecastday[1].day.avghumidity}%`;

  if (weather.forecast.forecastday[1].day.uv < 3) {
    uvIndexDayTwo.innerText = `Low, ${weather.forecast.forecastday[1].day.uv}`;
  } else if (weather.forecast.forecastday[1].day.uv < 6) {
    uvIndexDayTwo.innerText = `Moderate, ${weather.forecast.forecastday[1].day.uv}`;
  } else if (weather.forecast.forecastday[1].day.uv < 8) {
    uvIndexDayTwo.innerText = `High, ${weather.forecast.forecastday[1].day.uv}`;
  } else if (weather.forecast.forecastday[1].day.uv < 11) {
    uvIndexDayTwo.innerText = `Very High, ${weather.forecast.forecastday[1].day.uv}`;
  } else if (weather.forecast.forecastday[1].day.uv > 11) {
    uvIndexDayTwo.innerText = `Extreme, ${weather.forecast.forecastday[1].day.uv}`;
  }
}

//display day 3
function displayForecastDayThree(weather) {
  cityDayThree.innerText = `${weather.location.name}`;
  stateDayThree.innerText = `${weather.location.region}`;
  countryDayThree.innerText = `${weather.location.country}`;
  dateDayThree.innerText = `${weather.forecast.forecastday[2].date}`;

  if (mainContainer.classList.contains("celsius")) {
    maxMinTempDayThree.innerHTML = `<span class="bold">${Math.round(
      weather.forecast.forecastday[2].day.maxtemp_c
    )} &deg;C&uarr;</span>  ${Math.round(
      weather.forecast.forecastday[2].day.mintemp_c
    )}&deg;C&darr;`;
    tempetureDayThree.innerHTML = `${Math.round(
      weather.forecast.forecastday[2].day.avgtemp_c
    )}&deg;C`;
    visibilityDayThree.innerText = `${weather.forecast.forecastday[2].day.avgvis_km} km`;
    windDayThree.innerText = `${weather.forecast.forecastday[2].day.maxwind_kph} km/h`;
  } else {
    maxMinTempDayThree.innerHTML = `<span class="bold">${Math.round(
      weather.forecast.forecastday[2].day.maxtemp_f
    )} &deg;F&uarr;</span>  ${Math.round(
      weather.forecast.forecastday[2].day.mintemp_f
    )}&deg;F&darr;`;
    tempetureDayThree.innerHTML = `${Math.round(
      weather.forecast.forecastday[2].day.avgtemp_f
    )}&deg;F`;
    visibilityDayThree.innerText = `${weather.forecast.forecastday[2].day.avgvis_miles} mi`;
    windDayThree.innerText = `${Math.round(
      weather.forecast.forecastday[2].day.maxwind_mph
    )} mph`;
  }

  weatherConditionDayThree.innerHTML = `<img src="${weather.forecast.forecastday[2].day.condition.icon}" alt="weather state icon"/> ${weather.forecast.forecastday[1].day.condition.text}`;
  humidityDayThree.innerText = `${weather.forecast.forecastday[2].day.avghumidity}%`;

  if (weather.forecast.forecastday[2].day.uv < 3) {
    uvIndexDayThree.innerText = `Low, ${weather.forecast.forecastday[2].day.uv}`;
  } else if (weather.forecast.forecastday[2].day.uv < 6) {
    uvIndexDayThree.innerText = `Moderate, ${weather.forecast.forecastday[2].day.uv}`;
  } else if (weather.forecast.forecastday[2].day.uv < 8) {
    uvIndexDayThree.innerText = `High, ${weather.forecast.forecastday[2].day.uv}`;
  } else if (weather.forecast.forecastday[2].day.uv < 11) {
    uvIndexDayThree.innerText = `Very High, ${weather.forecast.forecastday[2].day.uv}`;
  } else if (weather.forecast.forecastday[2].day.uv > 11) {
    uvIndexDayThree.innerText = `Extreme, ${weather.forecast.forecastday[2].day.uv}`;
  }
}
