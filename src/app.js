let now = new Date();
let dateElement = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateElement.innerHTML = `${day} ${hours}:${minutes}`;

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let weatherIconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].description;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "e37af8b7e5570ed34e9bd67d3c3d2d12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(city) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
