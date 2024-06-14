const apiKey = 'a18a8ca90b16e043af93e9926472ad4e';  // Replace with your OpenWeatherMap API key

function getWeather() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, () => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data: ' + error));
}

function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data: ' + error));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
           
           <p class="large-text">${data.main.temp} °C</p>
             <p class="location-text"> ${data.name}, ${data.sys.country}</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity} %</p>
            
        `;
    } else {
        weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
    }
}
