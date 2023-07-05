import { handleWeatherRequest } from './app';

window.addEventListener('DOMContentLoaded', () => {
  // load paris data by default
  handleWeatherRequest('paris', 'hourly');
});
