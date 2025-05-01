function UnitToggle({ unit, onToggle }) {
  return (
    <div className="flex justify-end mb-4">
      <button 
        onClick={onToggle}
        className="bg-white/30 px-3 py-1 rounded-lg text-white text-sm hover:bg-white/40 transition-colors"
      >
        {unit === 'metric' ? '°C' : '°F'}
      </button>
    </div>
  );
}

export default UnitToggle;