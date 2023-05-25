import { handleWeatherRequest, state } from "./app.js";
import { clearContainer } from "./ui.js";

// use data index to update forecast
function handleForecastClick() {
  const forecastBtnContainer = document.getElementById("btn-container");

  forecastBtnContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      clearContainer();
      let city = state.currentCity;
      let forecastType = event.target.dataset.forecastType;
      handleWeatherRequest(city, forecastType);
    }
  });
}

// handle search input
function searchForCity() {
  const searchInput = document.getElementById("search-box");
  const form = document.getElementById("search-form");
  const searchBtn = document.getElementById("search-btn");
  const errorMsg = document.getElementById("error-msg");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  searchBtn.addEventListener("click", () => {
    errorMsg.textContent = "";
    handleWeatherRequest(searchInput.value, "hourly");
    searchInput.value = "";
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

function setupEventHandlers() {
  handleForecastClick();
  searchForCity();
  toggleTemperature();
}

export { setupEventHandlers };
