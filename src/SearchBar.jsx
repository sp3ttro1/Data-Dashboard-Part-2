import { useState } from 'react';

function SearchBar({ setSearchResult, apiKey }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") return;
    const res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${query}&key=${apiKey}`);
    const data = await res.json();
    setSearchResult(data.data[0]);
  };

  return (
    <div className="search-bar">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search City" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;