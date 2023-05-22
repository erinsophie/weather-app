import { getWeather, processWeatherData } from "./getData.js";
import { getForecast, processForecastData } from "./getHourly.js";
import { displayWeather, displayForecast} from "./ui.js";

async function handleWeatherRequest(city) {
  const rawData = await getWeather(city);
  console.log(rawData);

  const weatherData = processWeatherData(rawData);
  console.log(weatherData);
  displayWeather(weatherData);

  const rawForecastData = await getForecast(city);
  const forecastData = processForecastData(rawForecastData);
  console.log(forecastData);
  displayForecast(forecastData);
}

handleWeatherRequest(prompt("input city:"));
