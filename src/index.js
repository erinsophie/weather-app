import { getWeather, getHourly } from "./api.js";
import { displayWeather, displayHourly } from "./ui.js";

async function handleWeatherRequest(city) {
  try {
    const weatherData = await getWeather(city);
    displayWeather(weatherData);
    console.log(weatherData);

    const hourlyData = await getHourly(city);
    displayHourly(hourlyData);
    console.log(hourlyData);
  } catch (error) {
    console.error(error);
  }
}

handleWeatherRequest(prompt("input city:"));
