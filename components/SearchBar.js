import React, { useState, useCallback } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = ({ onSearch, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) onSearch(searchQuery.trim());
  }, [searchQuery, onSearch]);

  const handleChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="search-filter-bar">
      <Form onSubmit={handleSubmit} className="search-form">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search Pokémon by name or ID..."
            value={searchQuery}
            onChange={handleChange}
            disabled={loading}
          />
          <button
            className="btn-search"
            type="submit"
            disabled={loading || !searchQuery.trim()}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </InputGroup>
        <div className="search-hint">Try "pikachu", "fire", or a Pokémon ID like "25"</div>
      </Form>
    </div>
  );
};

export default SearchBar;
