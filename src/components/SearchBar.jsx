import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <input 
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search songs..."
        className="w-full p-2 rounded-md text-black"
      />
    </div>
  );
}

export default SearchBar;
