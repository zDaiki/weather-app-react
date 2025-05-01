function WeatherInfo({ weather, unit }) {
  return (
    <>
      {/* City and Date */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">{weather.city}, {weather.country}</h2>
        <p className="text-sm opacity-70">{weather.date}</p>
      </div>
      
      {/* Temperature and Weather Icon */}
      <div className="flex justify-center items-center mb-6">
        <div className="text-center">
          <div className="inline-block p-4 bg-white/30 rounded-full mb-2 float-animation">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt="Weather Icon" 
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-5xl font-bold">{weather.temp}°{unit === 'metric' ? 'C' : 'F'}</h1>
          <p className="text-lg capitalize">{weather.description}</p>
        </div>
      </div>
    </>
  );
}

export default WeatherInfo;