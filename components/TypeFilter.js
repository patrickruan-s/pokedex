import { useCallback } from 'react';
import TYPE_COLORS from './typeColors';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const TypeFilter = ({ onTypeChange, selectedType }) => {
  const handleTypeClick = useCallback((type) => {
    onTypeChange(selectedType === type ? '' : type);
  }, [selectedType, onTypeChange]);

  return (
    <div className="type-filter">
      <div className="type-filter-label">Filter by Type</div>
      <div className="type-badges">
        {POKEMON_TYPES.map(type => (
          <span
            key={type}
            className={`type-badge${selectedType === type ? ' active' : ''}`}
            style={{ background: TYPE_COLORS[type] || '#9FA19F' }}
            onClick={() => handleTypeClick(type)}
          >
            {capitalize(type)}
          </span>
        ))}
      </div>
      {selectedType && (
        <div className="filter-active-label">
          Showing: <strong>{capitalize(selectedType)}</strong> type Pokémon
        </div>
      )}
    </div>
  );
};

export default TypeFilter;
