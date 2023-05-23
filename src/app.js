import { getCurrent, getHourly, getWeekly } from "./api.js";
import { displayCurrent, displayHourly, displayWeekly } from "./ui.js";

async function handleWeatherRequest(city) {
  try {
    // fetch and display weather data
    const currentData = await getCurrent(city);
    displayCurrent(currentData);

    // fetch and display hourly data
    const hourlyData = await getHourly(city);
    displayHourly(hourlyData);

    // fetch and display weekly data
    const weeklyData = await getWeekly(city);
    displayWeekly(weeklyData);

  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { handleWeatherRequest }