const API_KEY = '8a27c5d56c235212f23ff6f733711c07'; 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-search');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weather-icon');
const currentTime = document.getElementById('current-time');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      updateWeather(data);
    })
    .catch(() => {
      alert('City not found. Please try again.');
    });
}

function updateWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  condition.textContent = `Condition: ${data.weather[0].description}`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherInfo.classList.remove('hidden');

  const weatherCondition = data.weather[0].main.toLowerCase();
  document.body.style.backgroundColor = getBackgroundColor(weatherCondition);

  const timezoneOffset = data.timezone; 
  const localTime = new Date(Date.now() + timezoneOffset * 1000);
  currentTime.textContent = `Local Time: ${localTime.toLocaleTimeString()}`;
}

function getBackgroundColor(condition) {
  switch (condition) {
    case 'clear':
      return '#87ceeb'; 
    case 'clouds':
      return '#d3d3d3'; 
    case 'rain':
    case 'drizzle':
      return '#9ec5f8'; 
    case 'snow':
      return '#f0f8ff'; 
    default:
      return '#f5f5f5'; 
  }
}
