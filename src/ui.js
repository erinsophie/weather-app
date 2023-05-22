import { parse, format } from 'date-fns';

function displayWeather(weatherData) {
    const city = document.getElementById('city');
    city.textContent = weatherData.location;

    const country = document.getElementById('country');
    country.textContent = weatherData.country;

    const localTime = document.getElementById('local-time');
    const date = weatherData.localTime
    const parsedDate = parse(date, 'yyyy-MM-dd HH:mm', new Date());
    let formattedDate = format(parsedDate, 'EEEE, do MMMM yyyy, HH:mm');
    localTime.textContent = formattedDate;

    const temp = document.getElementById('temp');
    temp.textContent = `${weatherData.temperature}°C`;

    const condition = document.getElementById('condition');
    condition.textContent = weatherData.condition;

    const wind = document.getElementById('wind');
    wind.textContent = `${weatherData.windSpeed} kph`;
}

// for each object returned by the forecast data, display like so:
function displayForecast(forecastData) {

}

export  {displayWeather, displayForecast }