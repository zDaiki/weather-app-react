import { useState, useEffect } from 'react';
import './App.css';

// Import components
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import WeatherDisplay from './components/weather/WeatherDisplay';

// Import services
import { 
  fetchWeatherByCity, 
  fetchWeatherByCoords, 
  formatWeatherData,
  convertTemperature // Add this import
} from './services/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  
  // Get user's location on initial load
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleFetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            // If geolocation fails, fall back to a default city
            console.error('Error getting location:', error);
            handleFetchWeatherByCity('Kathmandu'); // Use a default city as fallback
            
            // More specific error handling
            switch(error.code) {
              case error.PERMISSION_DENIED:
                setError("Using default city. To see your local weather, please enable location access.");
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location unavailable. Showing default city instead.");
                break;
              case error.TIMEOUT:
                setError("Location request timed out. Showing default city instead.");
                break;
              default:
                setError("Could not get your location. Showing default city instead.");
            }
          },
          // Add options with longer timeout and high accuracy
          { maximumAge: 60000, timeout: 10000, enableHighAccuracy: true }
        );
      } else {
        // Browser doesn't support geolocation
        setError('Geolocation is not supported by your browser. Showing default city.');
        handleFetchWeatherByCity('London'); // Use a default city as fallback
      }
    };
    
    getUserLocation();
  }, []);
  
  const handleFetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWeatherByCoords(lat, lon, unit);
      setWeather(formatWeatherData(data));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFetchWeatherByCity = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWeatherByCity(city, unit);
      setWeather(formatWeatherData(data));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleToggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    
    if (weather) {
      // Instead of fetching from API, convert the temperature locally
      const convertedWeather = convertTemperature(weather, newUnit);
      setWeather(convertedWeather);
    }
  };
  
  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleFetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          // More specific error handling
          switch(error.code) {
            case error.PERMISSION_DENIED:
              setError("Location access was denied. Please enable location permissions in your browser settings.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable. Please try again later.");
              break;
            case error.TIMEOUT:
              setError("The request to get your location timed out. Please try again.");
              break;
            default:
              setError("An unknown error occurred while trying to get your location.");
          }
          console.error('Error getting location:', error);
        },
        // Add options with longer timeout and high accuracy
        { maximumAge: 60000, timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6">
          <SearchBar 
            onSearch={handleFetchWeatherByCity} 
            onLocationRequest={handleLocationRequest} 
          />
          
          <UnitToggle unit={unit} onToggle={handleToggleUnit} />
          
          <ErrorMessage message={error} />
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <WeatherDisplay weather={weather} unit={unit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;