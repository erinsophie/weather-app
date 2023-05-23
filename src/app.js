import { getCurrent, getHourly, getWeekly } from "./api.js";
import {
  displayCurrent,
  displayHourly,
  displayWeekly,
  clearContainer,
} from "./ui.js";

// keep track of current state
const state = {
  currentCity: null,
  forecastType: "hourly",
  isCelsius: true,
};

async function handleWeatherRequest(city, forecastType) {
  state.currentCity = city;
  state.forecastType = forecastType;

  try {
    // fetch and display weather data
    const currentData = await getCurrent(city);
    displayCurrent(currentData);

    if (forecastType === "hourly") {
      // fetch and display hourly data
      const hourlyData = await getHourly(city);
      displayHourly(hourlyData);
      console.log(hourlyData);
    } else if (forecastType === "weekly") {
      // fetch and display weekly data
      const weeklyData = await getWeekly(city);
      displayWeekly(weeklyData);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
  console.log(state);
}

// if a button was clicked inside container,
// clear the contents and display the current city's data
// get forecast type from the button's data attribute
// then call the fetching and displaying function
function handleForecastClick(event) {
  if (event.target.tagName === "BUTTON") {
    clearContainer();
    let city = state.currentCity;
    let forecastType = event.target.dataset.forecastType;
    handleWeatherRequest(city, forecastType);
  }
}

// Attach a single event listener to the parent element
document
  .getElementById("btn-container")
  .addEventListener("click", handleForecastClick);

// handle the search for a city
function searchForCity() {
  const searchInput = document.getElementById("search-box");
  const form = document.getElementById("search-form");
  const searchBtn = document.getElementById("search-btn");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  searchBtn.addEventListener("click", async () => {
    handleWeatherRequest(searchInput.value, "hourly");
  });
}

// toggle temp
function toggleTemperature() {
  const tempBtn = document.getElementById("temp-btn");

  tempBtn.addEventListener("click", () => {
    state.isCelsius = !state.isCelsius;
    handleWeatherRequest(state.currentCity, state.forecastType);
  });
}

export { handleWeatherRequest, searchForCity, toggleTemperature, state };
