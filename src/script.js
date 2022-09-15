function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = `${temp}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let maxTemp = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#tempMax");
  max.innerHTML = ` ${maxTemp}° `;
  let minTemp = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#tempMin");
  min.innerHTML = ` ${minTemp}°`;
  let humidityValue = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidityValue");
  humidity.innerHTML = `${humidityValue}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = ` ${windSpeed} km/h `;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  let iconValue = response.data.weather[0].icon.toLowerCase();

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconValue}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-text-input");
  let units = "metric";
  let apiKey = "c85bec28379fe50c898d7cf523259179";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function showCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("#temp-now");
  currentTempElement.innerHTML = `${currentTemp}`;
  let currentCity = response.data.name;
  let currentCityElement = document.querySelector("h1");
  currentCityElement.innerHTML = currentCity;
  let maxTemp = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#tempMax");
  max.innerHTML = ` ${maxTemp}° `;
  let minTemp = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#tempMin");
  min.innerHTML = ` ${minTemp}° `;
  let humidityValue = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidityValue");
  humidity.innerHTML = `${humidityValue}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = ` ${windSpeed} km/h `;
  let description = response.data.weather[0].description;
  let descript = document.querySelector("#description");
  descript.innerHTML = `${description}`;
  celsiusTemperature = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  let iconValue = response.data.weather[0].icon.toLowerCase();

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconValue}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c85bec28379fe50c898d7cf523259179";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          
            <div id="days"><strong>${formatDay(forecastDay.dt)}</strong></div>
            <div id="icon"><img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42"/></div>
            <div><span><strong>${Math.round(
              forecastDay.temp.max
            )}° </strong></span>|<span class="minimum"> ${Math.round(
          forecastDay.temp.min
        )}°</span></div>
        
        </div>
       `;
  });

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function cityDefault(response) {
  let temp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = `${temp}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let maxTemp = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#tempMax");
  max.innerHTML = ` ${maxTemp}° `;
  let minTemp = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#tempMin");
  min.innerHTML = ` ${minTemp}°`;
  let humidityValue = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidityValue");
  humidity.innerHTML = `${humidityValue}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = ` ${windSpeed} km/h `;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  let iconValue = response.data.weather[0].icon.toLowerCase();

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconValue}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function defaultCity(event) {
  let defaultCity = "Lisbon";
  let units = "metric";
  let apiKey = "c85bec28379fe50c898d7cf523259179";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(cityDefault);
}

let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[now.getDay()];
let today = document.querySelector("#today");
today.innerHTML = `${weekday}`;
let currentDay = now.getDate();
if (currentDay < 10) {
  currentDay = `0${currentDay}`;
}
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${currentDay}.${currentMonth}.${currentYear}`;
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMin = now.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${currentHour}:${currentMin}, `;

let button = document.querySelector("#myLocation");

button.addEventListener("click", currentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
defaultCity();
