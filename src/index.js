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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class ="row">`;
  days.forEach(function(day) {
    forecastHTML = forecastHTML + `
    <div class="col-2">
  <div class="weather-forecast-day">${day}</div>
  <img src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">2° </span>
          <span class="weather-forecast-temperature-min">8° </span>
        </div>
      </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "7000e87df583f2a2518b94b8d5460599";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#speed").innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

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