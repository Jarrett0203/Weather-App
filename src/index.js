import {format} from 'date-fns'

const API_key = "5a5953b54684ec61924a024558f995b6";

const description = document.querySelector(".description");
const city = document.querySelector(".city");
const time = document.querySelector(".time");
const temp = document.querySelector(".temp");
const overall = document.querySelector(".overall");
const city_input = document.querySelector(".search");
const error = document.querySelector(".error-msg");

const feels_like = document.querySelector(".feels_like_info");
const humidity = document.querySelector(".humidity_info");
const pressure = document.querySelector(".pressure_info");
const wind = document.querySelector(".wind_info");

async function getWeatherData(location = 'London') {
  console.log(location);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location.trim()}&APPID=${API_key}`,
    { mode: "cors" }
  );
  if (response.status == "404") {
    error.classList.remove("hidden");
  }
  else {
    error.classList.add("hidden");
    const weatherData = await response.json();
    console.log(weatherData);
    const processedData = processWeatherData(weatherData);
    console.log(processedData);
    displayWeatherData(processedData);
  }
}

function processWeatherData(weatherData) {
  const processedData = {
    clouds: weatherData.clouds.all,
    coord: weatherData.coord,
    city: weatherData.name,
    main: weatherData.main,
    sys: weatherData.sys,
    weather: weatherData.weather[0],
    wind: weatherData.wind
  };
  return processedData;
}

function displayWeatherData(processedData) {
  const description_string = processedData.weather.description;
  const temp_value = processedData.main.temp;
  const weather_icon = processedData.weather.icon;

  const feels_like_temp = processedData.main.feels_like;
  const humidity_value = processedData.main.humidity;
  const pressure_value = processedData.main.pressure;
  const wind_speed_value = processedData.wind.speed;
  const currentDate = new Date();

  description.textContent = capitalizeFirstLetter(description_string);
  city.textContent = processedData.city;
  time.textContent = "Accurate as of " + format(currentDate, 'dd-MM-yy HH:mm:ss');
  overall.src = `https://openweathermap.org/img/wn/${weather_icon}.png`;  

  humidity.textContent = humidity_value + " %";
  pressure.textContent = pressure_value + " hPa";
  wind.textContent = wind_speed_value + " m/s";
  
  convertToC(temp, temp_value);
  convertToC(feels_like, feels_like_temp);
}

function capitalizeFirstLetter(string) {
  return string.split(" ").map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
}

function convertToF(temp, temp_value) {
  const fahrenheit = temp_value * 9/5 - 459.67;
  temp.textContent = Math.round(fahrenheit * 10) / 10 + " °C";
}

function convertToC(temp, temp_value) {
  const celsius = temp_value - 273.15;
  temp.textContent = Math.round(celsius * 10) / 10 + " °C";
}

city_input.addEventListener("keypress", e => 
  {if (e.key === 'Enter') {
    getWeatherData(e.target.value);
    e.target.value = '';
  }}
);

getWeatherData();
