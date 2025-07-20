const API_KEY = "your-api-key";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }


  // Current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("currentWeather").innerHTML = `<p>City not found.</p>`;
        return;
      }

      document.getElementById("currentWeather").style.display = "block";
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

      document.getElementById("currentWeather").innerHTML = `
        <h3>${data.name}</h3>
        <img src="${iconUrl}" alt="icon" class="icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
    });

  // Forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== "200") {
        document.getElementById("forecast").innerHTML = `<p>Forecast not available.</p>`;
        return;
      }

       document.querySelector("h2").style.display = "block";       
       document.getElementById("forecast").style.display = "grid";
 

      const forecastData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 4);

      let html = "";
      forecastData.forEach((item,index) => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        const iconCode = item.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        html += `
          <div class="forecast-card" style="animation-delay: ${index * 0.2}s">
            <h4>${date}</h4>
            <img src="${iconUrl}" alt="icon" class="icon">
            <p>${item.main.temp}°C</p>
            <p>${item.weather[0].description}</p>
          </div>
        `;
      });

      document.getElementById("forecast").innerHTML = html;
    });
}

