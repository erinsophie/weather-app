import { parse, format } from 'date-fns';

// returns json-parsed data
async function fetchData(url) {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      if (response.status === 400) {
        // if location not found throw error
        throw new Error('location not found');
      }
      // if there was a server error throw error
      throw new Error(`Server error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
    // throw error to propegate up to be handled by handleWeatheRequest
  } catch (error) {
    if (error instanceof TypeError) {
      error.message = 'network error';
    }
    throw error;
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
    icon: data.current.condition.icon,
    windSpeed: data.current.wind_kph,
    sunrise: data.forecast.forecastday[0].astro.sunrise,
    sunset: data.forecast.forecastday[0].astro.sunset,
  };
}

// parse date into time format
function parseDate(date) {
  const parsedDate = parse(date, 'yyyy-MM-dd HH:mm', new Date());
  const formattedDate = format(parsedDate, 'HH:mm');
  return formattedDate;
}

function processHourlyData(data) {
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

  // only show data from the current hour onwards
  const next12Hours = hoursArray.slice(currentIndex, currentIndex + 12);
  // transform each object to the below:
  return next12Hours.map((hour) => {
    const currentHour = parseDate(hour.time);
    return {
      hour: currentHour,
      temperature: hour.temp_c,
      icon: hour.condition.icon,
    };
  });
}

function processWeeklyData(data) {
  // array of next 7 days
  const weeklyForecast = data.forecast.forecastday.slice(1);
  console.log(weeklyForecast);

  // transform each object to the below:
  return weeklyForecast.map((day) => ({
    date: day.date,
    temperature: day.day.avgtemp_c,
    icon: day.day.condition.icon,
  }));
}

function makeUrl(city, days) {
  const baseUrl = 'https://api.weatherapi.com/v1';
  const apiKey = '8496bc66c37e43b1a0f180756231805';
  const url = `${baseUrl}/forecast.json?key=${apiKey}&q=${city}&days=${days}`;
  return url;
}

async function fetchAndProcess(url, processor) {
  try {
    const data = await fetchData(url);
    return processor(data);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function getCurrent(city) {
  const url = makeUrl(city, 1);
  return fetchAndProcess(url, processCurrentData);
}

async function getHourly(city) {
  const url = makeUrl(city, 2);
  return fetchAndProcess(url, processHourlyData);
}

async function getWeekly(city) {
  const url = makeUrl(city, 8);
  return fetchAndProcess(url, processWeeklyData);
}

export { getCurrent, getHourly, getWeekly, parseDate };
