import axios from 'axios';

// API key for OpenWeatherMap
const API_KEY = '543de45b0b1bb789afd6807dc9e9f4f1';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (city, unit) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('City not found. Please try again.');
  }
};

export const fetchWeatherByCoords = async (lat, lon, unit) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        lat,
        lon,
        units: unit,
        appid: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch weather for your location.');
  }
};

export const formatWeatherData = (data) => {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return {
    city: data.name,
    country: data.sys.country,
    date,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    wind: Math.round(data.wind.speed),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: formatTime(data.sys.sunrise * 1000),
    sunset: formatTime(data.sys.sunset * 1000)
  };
};

// Add this new function to convert temperatures without API call
export const convertTemperature = (weatherData, newUnit) => {
  if (!weatherData) return null;
  
  const converted = {...weatherData};
  
  if (newUnit === 'imperial') {
    // Convert from Celsius to Fahrenheit
    converted.temp = Math.round((weatherData.temp * 9/5) + 32);
    converted.feelsLike = Math.round((weatherData.feelsLike * 9/5) + 32);
    // Wind speed from km/h to mph
    converted.wind = Math.round(weatherData.wind * 0.621371);
  } else {
    // Convert from Fahrenheit to Celsius
    converted.temp = Math.round((weatherData.temp - 32) * 5/9);
    converted.feelsLike = Math.round((weatherData.feelsLike - 32) * 5/9);
    // Wind speed from mph to km/h
    converted.wind = Math.round(weatherData.wind / 0.621371);
  }
  
  return converted;
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};