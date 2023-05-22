async function getForecast(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8496bc66c37e43b1a0f180756231805&q=${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        throw new Error('Error: ' + error);
    }
}

// get an array objects that contain each hour of the day
// for each hoour return an object containing the following info
function processForecastData(data) {
    console.log(data.forecast)
    const forecastList = data.forecast.forecastday[0].hour;

    return forecastList.map(hour => {
        return {
            hour: hour.time, 
            temperature: hour.temp_c, 
            condition: hour.condition.text,
        };
    });
}

export { getForecast, processForecastData }