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

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = `${temp}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let maxTemp = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#tempMax");
  max.innerHTML = ` ${maxTemp}°C `;
  let minTemp = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#tempMin");
  min.innerHTML = ` ${minTemp}°C `;
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
  let apiKey = "c85bec28379fe50c898d7cf523259179";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("#temp-now");
  currentTempElement.innerHTML = `${currentTemp}`;
  let currentCity = response.data.name;
  let currentCityElement = document.querySelector("h1");
  currentCityElement.innerHTML = currentCity;
  let maxTemp = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#tempMax");
  max.innerHTML = ` ${maxTemp}°C `;
  let minTemp = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#tempMin");
  min.innerHTML = ` ${minTemp}°C `;
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
let button = document.querySelector("#myLocation");

button.addEventListener("click", currentLocation);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
          
            <div id="days"><strong>${day}</strong></div>
            <div id="icon">🌞</div>
            <div><span>15°</span>|<span class="minimum"> 10°</span></div>
        
        </div>
       `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
