// hindi

const cities = {
    "New York": { lat: 40.7128, lon: -74.0060 },
    "Los Angeles": { lat: 34.0522, lon: -118.2437 },
    "Chicago": { lat: 41.8781, lon: -87.6298 },
    "Houston": { lat: 29.7604, lon: -95.3698 },
    "Phoenix": { lat: 33.4484, lon: -112.0740 }
};

document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('city-select');
    Object.keys(cities).forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        select.appendChild(option);
    });
});

function fetchWeather() {
    const city = document.getElementById('city-select').value;
    const { lat, lon } = cities[city];
    fetch(`https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => console.error('Error fetching data: ', error));
}

function displayWeather(data) {
    const weather = document.getElementById('weather-details');
    if (data.dataseries && data.dataseries.length > 0) {
        const today = data.dataseries[0];
        const weatherImage = determineWeatherImage(today.weather);
        weather.innerHTML = `
            <h2>Weather Details for ${document.getElementById('city-select').value}</h2>
            <img src="${weatherImage}" alt="${today.weather}">
            <p>Weather: ${today.weather}</p>
            <p>Temperature Max: ${today.temp2m.max} °C</p>
            <p>Temperature Min: ${today.temp2m.min} °C</p>
            <p>Wind Speed: ${today.wind10m_max} m/s</p>
            <p>Cloud Cover: ${today.cloudcover}%</p>
        `;
    } else {
        weather.innerHTML = `<p>Weather data not available. Please try another location.</p>`;
    }
}

function determineWeatherImage(weather) {
    switch(weather) {
        case 'clear':
            return 'https://media.istockphoto.com/id/1208368568/photo/dramatic-sunset-and-sunrise-sky-nature-background-with-white-clouds.jpg?s=612x612&w=0&k=20&c=mu12e5RAWbRKShGqpuRtNJHN7ZXHiohsmSBFbUXchT4='; 
        case 'pcloudy':
        case 'mcloudy':
        case 'cloudy':
        case 'rain':
            return 'https://www.shutterstock.com/image-photo/dramatic-black-cloud-before-rainy-260nw-549197416.jpg';
        default:
            return 'https://www.indiewire.com/wp-content/uploads/2016/10/screen-shot-2016-10-17-at-2-56-28-pm.png'; 
    }
}
