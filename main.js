document.addEventListener("DOMContentLoaded", function () {
  async function getWeatherDataByCity(cityName) {
    const apiKey = "633778ed2383e1a970da86c412e57e58";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  }

  function refreshWeather(weatherData) {
    document.getElementById("city-name").innerText = weatherData.name;
    document.getElementById("temperature").innerText = Math.round(
      weatherData.main.temp
    );
    document.getElementById("humidity").innerText =
      weatherData.main.humidity + "%";
    document.getElementById("wind-speed").innerText =
      weatherData.wind.speed + "m/s";
    document.getElementById("weather-info").innerText =
      new Date(weatherData.dt * 1000).toLocaleString() +
      ", " +
      weatherData.weather[0].description;
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.getElementById("search-form-input").value;

    getWeatherDataByCity(searchInput)
      .then((weatherData) => {
        refreshWeather(weatherData);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  document
    .getElementById("search-form")
    .addEventListener("submit", handleSearchSubmit);
});
