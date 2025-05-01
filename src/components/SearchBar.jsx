import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

function SearchBar({ onSearch, onLocationRequest }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search city..."
          className="w-full py-3 px-4 bg-white/30 rounded-xl outline-none placeholder:text-white/70 text-white"
        />
        <button 
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-lg hover:bg-white/40 transition-colors"
        >
          <FaSearch className="text-white" />
        </button>
      </div>
      <button 
        onClick={onLocationRequest}
        className="bg-white/30 p-3 rounded-xl hover:bg-white/40 transition-colors"
        title="Use my location"
      >
        <FaMapMarkerAlt className="text-white" />
      </button>
    </div>
  );
}

export default SearchBar;