function SunriseSunset({ sunrise, sunset }) {
  return (
    <div className="bg-white/10 rounded-2xl p-4 hover-scale">
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="text-sm opacity-70">Sunrise</p>
          <p className="font-semibold">{sunrise}</p>
        </div>
        <div className="h-8 w-px bg-white/30"></div>
        <div className="text-center">
          <p className="text-sm opacity-70">Sunset</p>
          <p className="font-semibold">{sunset}</p>
        </div>
      </div>
    </div>
  );
}

export default SunriseSunset;