function LoadingSpinner() {
  return (
    <div className="text-center text-white">
      <div className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mb-2"></div>
      <p>Loading weather data...</p>
    </div>
  );
}

export default LoadingSpinner;