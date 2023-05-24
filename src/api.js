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
    console.error(error.message);
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
    sunrise: data.forecast.forecastday[0].astro.sunrise,
    sunset: data.forecast.forecastday[0].astro.sunset,
  };
}

// parse date into time format
function parseDate(date) {
  const parsedDate = parse(date, "yyyy-MM-dd HH:mm", new Date());
  const formattedDate = format(parsedDate, "HH:mm");
  return formattedDate;
}

function processHourlyData(data) {
  console.log(data);
  // get local time of the current city
  const currentTime = parseDate(data.location.localtime);
  const hoursToday = data.forecast.forecastday[0].hour;
  const hoursTomorrow = data.forecast.forecastday[1].hour;

  // combine the today and tomrrows hours into one
  const hoursArray = hoursToday.concat(hoursTomorrow);

  // find the index of the current hour
  const currentIndex = hoursArray.findIndex(
    (hour) => parseDate(hour.time) >= currentTime
  );

  const next12Hours = hoursArray.slice(currentIndex, currentIndex + 12);
  // transform each object to the below:
  return next12Hours.map((hour) => {
    const currentHour = parseDate(hour.time);
    return {
      hour: currentHour,
      temperature: hour.temp_c,
    };
  });
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
    console.error(error.message);
  }
}

async function getCurrent(city) {
  const url = makeUrl(city, 1);
  return await fetchAndProcess(url, processCurrentData);
}

async function getHourly(city) {
  const url = makeUrl(city, 2);
  return await fetchAndProcess(url, processHourlyData);
}

async function getWeekly(city) {
  const url = makeUrl(city, 7);
  return await fetchAndProcess(url, processWeeklyData);
}

export { getCurrent, getHourly, getWeekly, parseDate };
