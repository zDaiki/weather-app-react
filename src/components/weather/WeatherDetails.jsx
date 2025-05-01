import { FaTemperatureHigh, FaWind, FaWater } from 'react-icons/fa';

function WeatherDetails({ weather, unit }) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white/10 rounded-2xl p-4 hover-scale mb-4">
      <div className="flex flex-col items-center">
        <FaTemperatureHigh className="text-xl mb-2" />
        <p className="text-sm opacity-70">Feels Like</p>
        <p className="font-semibold">{weather.feelsLike}°{unit === 'metric' ? 'C' : 'F'}</p>
      </div>
      <div className="flex flex-col items-center">
        <FaWater className="text-xl mb-2" />
        <p className="text-sm opacity-70">Humidity</p>
        <p className="font-semibold">{weather.humidity}%</p>
      </div>
      <div className="flex flex-col items-center">
        <FaWind className="text-xl mb-2" />
        <p className="text-sm opacity-70">Wind</p>
        <p className="font-semibold">{weather.wind} {unit === 'metric' ? 'km/h' : 'mph'}</p>
      </div>
    </div>
  );
}

export default WeatherDetails;