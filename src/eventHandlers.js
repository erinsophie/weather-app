import { handleWeatherRequest, state } from './app.js';
import { clearContainer, highlightBtn } from './ui.js';

// use data index to update forecast
function handleForecastClick() {
  const forecastBtnContainer = document.querySelector('.btn-container');

  forecastBtnContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      clearContainer();
      let city = state.currentCity;
      let forecastType = event.target.dataset.forecastType;
      handleWeatherRequest(city, forecastType);
      highlightBtn();
    }
  });
}

// handle search input
function searchForCity() {
  const searchInput = document.querySelector('.search-box');
  const form = document.querySelector('.search-form');
  const searchBtn = document.querySelector('.search-btn');
  const errorMsg = document.querySelector('.error-msg');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  searchBtn.addEventListener('click', () => {
    errorMsg.textContent = '';
    if (searchInput.value === '') {
      return;
    }
    handleWeatherRequest(searchInput.value, 'hourly');
    searchInput.value = '';
    highlightBtn();
  });
}

// toggle temp
function toggleTemperature() {
  const tempBtn = document.querySelector('.temp-btn');

  tempBtn.addEventListener('click', () => {
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
