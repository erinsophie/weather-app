// returns json-parsed data
async function fetchData(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
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

// returns object with weather data
function processCurrentData(data) {
  return {
    location: data.location.name,
    country: data.location.country,
    localTime: data.location.localtime,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    windSpeed: data.current.wind_kph,
  };
}

function processHourlyData(data) {
  // grab array of all the hours in the current day
  const hoursArray = data.forecast.forecastday[0].hour;
  console.log(hoursArray)

  // for each object representing an hour, map over it and transform it into the below object
  return hoursArray.map((hour) => {
    return {
      hour: hour.time,
      temperature: hour.temp_c,
    };
  });
}

function processWeeklyData(data) {
  // grab array of 7 day forecast
  const weeklyForecast = data.forecast.forecastday;
  console.log(weeklyForecast)
  
  // for each object representing a day, map over it and transform it into the below object
  return weeklyForecast.map((day) => {
    return {
      date: day.date,
      temperature: day.day.avgtemp_c,
    };
  });
}

// returns object containing current weather data
async function getCurrent(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=8496bc66c37e43b1a0f180756231805&q=${city}`;
  const data = await fetchData(url);
  return processCurrentData(data);
}

// for each hour, returns an object containing hourly data
async function getHourly(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=8496bc66c37e43b1a0f180756231805&q=${city}`;
  const data = await fetchData(url);
  return processHourlyData(data);
}

// fetch weekly forecast
async function getWeekly(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=8496bc66c37e43b1a0f180756231805&q=${city}&days=7`;
  const data = await fetchData(url);
  return processWeeklyData(data);
}

export { getCurrent, getHourly, getWeekly };
