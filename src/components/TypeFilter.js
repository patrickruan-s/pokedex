import { useCallback } from 'react';
import { Form, Badge } from 'react-bootstrap';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter = ({ onTypeChange, selectedType }) => {
  const handleTypeClick = useCallback((type) => {
    const newType = selectedType === type ? '' : type;
    onTypeChange(newType);
  }, [selectedType, onTypeChange]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="type-filter p-3 mb-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <Form.Label className="mb-3">
        <strong>Filter by Type:</strong>
      </Form.Label>
      <div className="d-flex flex-wrap gap-2 type-buttons">
        {POKEMON_TYPES.map(type => (
          <Badge
            className={selectedType === type ? 'selected' : 'type-button'}
            key={type}
            pill
            bg={selectedType === type ? 'primary' : 'secondary'}
            style={{
              cursor: 'pointer',
              fontSize: '0.85rem',
              padding: '0.5rem 0.75rem',
              opacity: selectedType === type ? 1 : 0.7
            }}
            onClick={() => handleTypeClick(type)}
          >
            {capitalizeFirstLetter(type)}
          </Badge>
        ))}
      </div>
      {selectedType && (
        <small className="text-muted mt-2 d-block">
          Showing: {capitalizeFirstLetter(selectedType)} type Pokemon
        </small>
      )}
    </div>
  );
};

export default TypeFilter;