import { getForecast } from "./getHourly";

// fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8496bc66c37e43b1a0f180756231805&q=${city}`, {mode: 'cors'});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}

// return object containing weather data
function processWeatherData(data) {
    return {
        location: data.location.name,
        country: data.location.country,
        localTime: data.location.localtime,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        windSpeed: data.current.wind_kph,
    };
}

export { getWeather, processWeatherData }