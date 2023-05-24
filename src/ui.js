import { parse, format } from "date-fns";
import { state } from "./app.js";

function convertToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function displayTemp(data) {
  const temp = Math.round(data.temperature);
  return state.isCelsius ? `${temp}°C` : `${convertToFahrenheit(temp)}°F`;
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
  sunrise.textContent = `Sunrise at ${currentData.sunrise}`;

  const sunset = document.getElementById("sunset");
  sunset.textContent = `Sunset at ${currentData.sunset}`;
}

// for each hour object, display like so:
function displayHourly(hourlyData) {
  clearContainer();
  hourlyData.forEach((obj) => {
    const time = document.createElement("div");
    time.textContent = obj.hour;
    time.classList.add("hour-data");

    const temp = document.createElement("div");
    temp.textContent = displayTemp(obj);
    temp.classList.add("temp-data");

    const container = document.createElement("div");
    container.classList.add("hours-container");
    container.append(time, temp);

    const forecastContainer = document.getElementById("forecast-container");

    forecastContainer.append(container);
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
    dayOfWeek.classList.add("day-of-week");

    const temp = document.createElement("div");
    temp.textContent = displayTemp(day);
    temp.classList.add("temp-data");

    const container = document.createElement("div");
    container.classList.add("week-container");
    container.append(dayOfWeek, temp);

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.append(container);
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
  errorMsg.textContent = message;
}

export {
  displayCurrent,
  displayHourly,
  displayWeekly,
  clearContainer,
  displayError,
};
