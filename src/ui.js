import { parse, format } from "date-fns";

function displayCurrent(currentData) {
  const city = document.getElementById("city");
  city.textContent = currentData.location;

  const country = document.getElementById("country");
  country.textContent = currentData.country;

  const localTime = document.getElementById("local-time");
  const date = currentData.localTime;
  const parsedDate = parse(date, "yyyy-MM-dd HH:mm", new Date());
  let formattedDate = format(parsedDate, "EEEE, do MMMM yyyy, HH:mm");
  localTime.textContent = formattedDate;

  const temp = document.getElementById("temp");
  temp.textContent = `${currentData.temperature}°C`;

  const condition = document.getElementById("condition");
  condition.textContent = currentData.condition;

  const wind = document.getElementById("wind");
  wind.textContent = `${currentData.windSpeed} kph`;
}

// for each hour object, display like so:
function displayHourly(hourlyData) {
  hourlyData.forEach((hour) => {
    const time = document.createElement("div");
    time.textContent = hour.hour;

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
