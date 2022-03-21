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

function displayForecast(){
  let forecastElement = document.querySelector("forecast");
  let forecastHTML = `<div class ="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function(day) {
    forecastHTML = forecastHTML + `
  <div class="weather-forecast">
				<div class="row">
					<div class="col-5">${day} <i class="fas fa-cloud-sun"></i></div>
				<div class="col-5">${day} <i class="fas fa-cloud"></i></div>
				<div class="col-5">${day} <i class="fas fa-cloud-showers-heavy"></i></div>
				<div class="col-5">${day} <i class="fas fa-cloud"></i></div>
				<div class="col-5">${day} <i class="fas fa-cloud-showers-heavy"></i></div>
				</div>
				</div>

        <div class="container">
					<div class="row2">
						<div class="col-5"></div>
						<div class="col-5"></div>
						<div class="col-5">80%</div>
						<div class="col-5"></div>
						<div class="col-5">50%</div>
					</div>
					</div>

          <div class="container">
					<div class="row3">
						<div class="col-5"><b>2</b>°C <i class="fas fa-grip-lines"></i> <b>8</b>°C</div>
						<div class="col-5"><b>5</b>°C <i class="fas fa-grip-lines"></i> <b>9</b>°C</div>
						<div class="col-5"><b>3</b>°C <i class="fas fa-grip-lines"></i> <b>7</b>°C</div>
						<div class="col-5"><b>3</b>°C <i class="fas fa-grip-lines"></i> <b>6</b>°C</div>
						<div class="col-5"><b>3</b>°C <i class="fas fa-grip-lines"></i> <b>7</b>°C</div>
					</div> 
`;
  });
  forecastHTML = `</div>`
  forecastElement.innerHTML = forecastHTML;
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

displayForecast();