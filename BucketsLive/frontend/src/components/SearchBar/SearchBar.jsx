import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      alert(`Searching for: ${searchValue}`);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-bar">
        <span className="material-symbols-outlined search-icon">search</span>

        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search players, teams, stats and news..."
          className="search-input"
        />

        {searchValue && (
          <span
            className="clear-btn material-symbols-outlined"
            onClick={clearSearch}
            title="Clear search"
            style={{ fontSize: '20px' }}
          >
            close
          </span>
        )}
      </form>
    </div>
  );
}

export default SearchBar;