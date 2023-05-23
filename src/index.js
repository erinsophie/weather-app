import { handleWeatherRequest } from "./app.js";

// show hourly data by default
window.addEventListener("DOMContentLoaded", () => {
  const city = prompt("Input city:");
  handleWeatherRequest(city, "hourly");
});
