import { getCurrent, getHourly, getWeekly } from "./api.js";
import { setupEventHandlers } from "./eventHandlers.js";
import {
  displayCurrent,
  displayHourly,
  displayWeekly,
  displayError,
  highlightBtn,
} from "./ui.js";

// set up event handlers
setupEventHandlers();

// keep track of current state
const state = {
  currentCity: null,
  forecastType: "hourly",
  isCelsius: true,
};

highlightBtn();

// fetch and display data
async function handleWeatherRequest(city, forecastType) {
  state.currentCity = city;
  state.forecastType = forecastType;

  try {
    // fetch and display weather data
    const currentData = await getCurrent(city);
    displayCurrent(currentData);

    if (forecastType === "hourly") {
      const hourlyData = await getHourly(city);
      displayHourly(hourlyData);
    } else if (forecastType === "weekly") {
      const weeklyData = await getWeekly(city);
      displayWeekly(weeklyData);
    }
    // centralized error handling of fetch errors
  } catch (error) {
    console.error(error);
    handleErrorMsg(error, city);
  }
  console.log(state);
}

// display specific message for error
function handleErrorMsg(error, city) {
  if (error.message === "location not found") {
    displayError(`Sorry, ${city} was not found`);
  } else if (error.message === "network error") {
    displayError(
      "Sorry, something went wrong. Please check your network connection."
    );
  } else {
    displayError("Sorry, an unexpected error occurred. Please try again.");
  }
}

export { handleWeatherRequest, state };
