const temp = document.querySelector(".temp");
async function getWeatherData(location = 'London') {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location},uk&APPID=5a5953b54684ec61924a024558f995b6`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  
  const processedData = processWeatherData(weatherData);
  displayWeatherData(processedData);
}

function processWeatherData(weatherData) {
  const processedData = {
    name: weatherData.name,
    main: weatherData.main,
    sys: weatherData.sys,
    weather: weatherData.weather[0],
    wind: weatherData.wind
  };
  return processedData;
}

function displayWeatherData(processedData) {
  const celsius = convertToC(processedData.main.temp);
  temp.textContent = Math.round(celsius * 10) / 10 + " °C";
}

function convertToF(temp) {
  return temp * 9/5 - 459.67;
}

function convertToC(temp) {
  return temp - 273.15;
}


getWeatherData();
