document.getElementById('searchButton').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const apiKey = '0aac3e29aeeeefc295f178e5d5a5a87a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            alert('City not found');
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `
        <div class="weather-card">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}
