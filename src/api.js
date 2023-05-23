import { parse, format } from "date-fns";

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

// parse date into time format
function parseDate(date) {
  const parsedDate = parse(date, "yyyy-MM-dd HH:mm", new Date());
  const formattedDate = format(parsedDate, "HH:mm");
  return formattedDate;
}

function processHourlyData(data) {
  // get local time of the current city
  const currentTime = parseDate(data.location.localtime);

  // grab array of all the hours in the current day
  const hoursArray = data.forecast.forecastday[0].hour;

  // transform each object to the below:
  return hoursArray
    .map((hour) => {
      // only process the hours that are upcoming
      const currentHour = parseDate(hour.time);

      if (currentHour >= currentTime) {
        return {
          hour: currentHour,
          temperature: hour.temp_c,
        };
      }
    })
    .filter((hour) => hour !== undefined);
}

function processWeeklyData(data) {
  // grab array of 7 day forecast
  const weeklyForecast = data.forecast.forecastday;

  // for each object representing a day, map over it and transform it into the below object
  return weeklyForecast.map((day) => {
    return {
      date: day.date,
      temperature: day.day.avgtemp_c,
    };
  });
}

function makeUrl(city, days) {
  const baseUrl = "https://api.weatherapi.com/v1";
  const apiKey = "8496bc66c37e43b1a0f180756231805";
  let url = `${baseUrl}/forecast.json?key=${apiKey}&q=${city}`;

  if (days !== null) {
    return (url += `&days=${days}`);
  } else {
    return url;
  }
}

async function fetchAndProcess(url, processor) {
  try {
    const data = await fetchData(url);
    return processor(data);
  } catch (error) {
    console.error(`Error fetching or processing data: ${error}`);
  }
}

async function getCurrent(city) {
  const url = makeUrl(city, 1);
  return fetchAndProcess(url, processCurrentData);
}

async function getHourly(city) {
  const url = makeUrl(city, 1);
  return fetchAndProcess(url, processHourlyData);
}

async function getWeekly(city) {
  const url = makeUrl(city, 7);
  return fetchAndProcess(url, processWeeklyData);
}

export { getCurrent, getHourly, getWeekly };
