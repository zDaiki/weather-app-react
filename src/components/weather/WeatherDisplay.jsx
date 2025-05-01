import WeatherInfo from './WeatherInfo';
import WeatherDetails from './WeatherDetails';
import SunriseSunset from './SunriseSunset';

function WeatherDisplay({ weather, unit }) {
  if (!weather) {
    return (
      <div className="text-center text-white">
        <h2 className="text-3xl font-semibold">Weather App</h2>
        <p className="text-lg mt-2">Search for a city to see the weather</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <WeatherInfo weather={weather} unit={unit} />
      <WeatherDetails weather={weather} unit={unit} />
      <SunriseSunset sunrise={weather.sunrise} sunset={weather.sunset} />
    </div>
  );
}

export default WeatherDisplay;