import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  // Debounced search to reduce API calls
  const debouncedSearch = useCallback(
    debounce((value) => onSearch(value), 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Enter GitHub username..."
      value={input}
      onChange={handleChange}
      className="search-input"
    />
  );
};

export default SearchBar;