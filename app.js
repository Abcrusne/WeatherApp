document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace this with your API key https://openweathermap.org/api
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const weatherInfo = document.getElementById('weatherInfo');

  searchButton.addEventListener('click', () => {
    const cityName = searchInput.value.trim();

    if (!cityName) {
      alert('Please enter a city name.');
      return;
    }

    getWeatherData(cityName)
      .then((data) => displayWeather(data))
      .catch((error) => {
        alert('Error fetching weather data. Please try again later.');
        console.error(error);
      });
  });

  async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  function displayWeather(data) {
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const cityName = data.name;
    const country = data.sys.country;

    const weatherText = `Weather in ${cityName}, ${country}: ${weatherDescription}, Temperature: ${temperature} °C`;
    weatherInfo.textContent = weatherText;
  }
});
