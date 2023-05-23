import { parse, format } from "date-fns";

function displayCurrent(weatherData) {
  const city = document.getElementById("city");
  city.textContent = weatherData.location;

  const country = document.getElementById("country");
  country.textContent = weatherData.country;

  const localTime = document.getElementById("local-time");
  const date = weatherData.localTime;
  const parsedDate = parse(date, "yyyy-MM-dd HH:mm", new Date());
  let formattedDate = format(parsedDate, "EEEE, do MMMM yyyy, HH:mm");
  localTime.textContent = formattedDate;

  const temp = document.getElementById("temp");
  temp.textContent = `${weatherData.temperature}`;

  const condition = document.getElementById("condition");
  condition.textContent = weatherData.condition;

  const wind = document.getElementById("wind");
  wind.textContent = `${weatherData.windSpeed} kph`;
}

// for each hour object, display like so:
function displayHourly(hourlyData) {
  hourlyData.forEach((hour) => {
    const time = document.createElement("div");
    const parsedDate = parse(hour.hour, "yyyy-MM-dd HH:mm", new Date());
    let formattedHour = format(parsedDate, "HH:mm");
    time.textContent = formattedHour;

    const temp = document.createElement("div");
    temp.textContent = `${hour.temperature}°C`;

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.append(time, temp);
  });
}

// for each day object, display like so:
function displayWeekly(weeklyData) {
  weeklyData.forEach((day) => {
    const dayOfWeek = document.createElement("div");
    const date = day.date;
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    let formattedDate = format(parsedDate, "EEEE");
    dayOfWeek.textContent = formattedDate;

    const temp = document.createElement("div");
    temp.textContent = `${day.temperature}°C`;

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.append(dayOfWeek, temp);
  });
}

// clear forecast container
function clearContainer() {
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";
}

export { displayCurrent, displayHourly, displayWeekly, clearContainer };
