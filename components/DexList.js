import React, { useState } from 'react';
import PokeCard from './PokeCard';
import ExpandedPokeCard from './ExpandedPokeCard';

const DexList = ({ pokemonList }) => {
  const [selectedMonId, setSelectedMonId] = useState(null);
  const [selectedMon, setSelectedMon] = useState(null);

  const handleClick = (id) => {
    if (id === selectedMonId) {
      setSelectedMonId(null);
      setSelectedMon(null);
    } else {
      setSelectedMonId(id);
      const mon = pokemonList.find(p => p.data.id === id) ?? null;
      setSelectedMon(mon);
    }
  };

  return (
    <div className="row" style={{ margin: 0 }}>
      <div className={`dex-display${selectedMonId == null ? ' hidden' : ' col-4'}`}>
        <ExpandedPokeCard pokemon={selectedMon} />
      </div>
      <div className={selectedMonId == null ? 'col-12' : 'col-8'} id="dex-list">
        <div className="dex-row">
          {pokemonList.map(pokemon => (
            <PokeCard
              key={pokemon.data.id}
              pokemon={pokemon}
              isSelected={pokemon.data.id === selectedMonId}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DexList;
