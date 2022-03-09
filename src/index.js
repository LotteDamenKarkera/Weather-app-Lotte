let now = new Date();

let weekDays = document.querySelector("#weekDay");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
weekDays.innerHTML = day;

let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let time = document.querySelector("#currentTime");
time.innerHTML = `${hours}:${minutes}`;

//

let searchText = document.querySelector("#changeyourcity");
let changeCity = document.querySelector("#changeCity");
changeCity.addEventListener("submit", searchCity);

function currentTemperature(response) {
    let temperatureElement = document.queryselector("#temperature");
    let cityElement = document.queryselector("#city");
    let descriptionElement = document.queryselector("#description");
    let humidityElement = document.queryselector("#humidity");
    let windElement = document.queryselector("#speed");
    temperatureElement.innerHTML = Math.round (response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    }

function searchCity(event) {
  event.preventDefault(event);
  let searchTextValue = searchText.value;
  let city = document.querySelector("#city");
  city.innerHTML = searchTextValue;
  let apiKey = "7000e87df583f2a2518b94b8d5460599";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTextValue}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemperature);
}