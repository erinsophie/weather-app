import { handleWeatherRequest } from "./app.js";

window.addEventListener("DOMContentLoaded", () => {
  handleWeatherRequest(prompt("Input city:"));
});
