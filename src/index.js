import { handleWeatherRequest, searchForCity, toggleTemperature } from "./app.js";

window.addEventListener("DOMContentLoaded", () => {
  // load paris data by default
  handleWeatherRequest("paris", "hourly");
  searchForCity();
  toggleTemperature();
});
