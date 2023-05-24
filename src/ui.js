import { parse, format } from "date-fns";
import { state } from "./app.js";

function convertToFahrenheit(celsius) {
  const convertedTemp = (celsius * 9) / 5 + 32;
  return Math.round(convertedTemp);
}

function displayTemp(data) {
  return state.isCelsius
    ? `${data.temperature}°C`
    : `${convertToFahrenheit(data.temperature)}°F`;
}

function displayCurrent(currentData) {
  const city = document.getElementById("city");
  city.textContent = currentData.location;

  const country = document.getElementById("country");
  country.textContent = currentData.country;

  const localTime = document.getElementById("local-time");
  // parsing the date in the ui purely for ui purposes
  const date = currentData.localTime;
  const parsedDate = parse(date, "yyyy-MM-dd HH:mm", new Date());
  let formattedDate = format(parsedDate, "EEEE, do MMMM yyyy, HH:mm");
  localTime.textContent = formattedDate;

  const temp = document.getElementById("temp");
  temp.textContent = displayTemp(currentData);

  const condition = document.getElementById("condition");
  condition.textContent = currentData.condition;

  const wind = document.getElementById("wind");
  wind.textContent = `Wind ${currentData.windSpeed} kph`;

  const sunrise = document.getElementById("sunrise");
  sunrise.textContent = `Sunrise ${currentData.sunrise}`;

  const sunset = document.getElementById("sunset");
  sunset.textContent = `Sunset ${currentData.sunset}`;
}

// for each hour object, display like so:
function displayHourly(hourlyData) {
  clearContainer();
  hourlyData.forEach((obj) => {
    const time = document.createElement("div");
    time.textContent = obj.hour;

    const temp = document.createElement("div");
    temp.textContent = displayTemp(obj);

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.append(time, temp);
  });
}

// for each day object, display like so:
function displayWeekly(weeklyData) {
  clearContainer();
  weeklyData.forEach((day) => {
    const dayOfWeek = document.createElement("div");
    // parsing the date in the ui purely for ui purposes
    const date = day.date;
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    let formattedDate = format(parsedDate, "EEEE");
    dayOfWeek.textContent = formattedDate;

    const temp = document.createElement("div");
    temp.textContent = displayTemp(day);

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.append(dayOfWeek, temp);
  });
}

// clear forecast container
function clearContainer() {
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";
}

// handle error
function displayError(message) {
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = message
}

export {
  displayCurrent,
  displayHourly,
  displayWeekly,
  clearContainer,
  displayError,
};
