import React, {useState, useEffect} from 'react';
import PokeCard from './PokeCard';
import ExpandedPokeCard from './ExpandedPokeCard';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DexList = (props) => {
    const [expandedCard, setExpandedCard] = useState(null)
    const [selectedMon, setSelectedMon] = useState(null);
    const pokemonData = props.pokemonList;

    
    const handleClick = (key) => {
        console.log(key);
        if(key == expandedCard) {
            setExpandedCard(null);
            setSelectedMon(null);
        } else {
            setExpandedCard(key);
            findSelectedMon(key);
        }
    }

    const findSelectedMon = (id) => {
        if(pokemonData == null || pokemonData.length <= 0) { return setSelectedMon(null) }

        const ids = pokemonData.map(pokemon => pokemon.data.id);
        const mon = pokemonData[ids.indexOf(id)];
        setSelectedMon(mon);
    }

    return(
        <div className='row'>
            {}
            <div className={`${expandedCard == null ? 'hidden' : 'show-display col'} dex-display`}>
                { expandedCard ? <ExpandedPokeCard pokemon={selectedMon} onClick={handleClick} /> : null }
            </div>
            <div className='col dex-list' id='dex-list'>
                <div className='row dex-row'>
                    {pokemonData.map(pokemon => {
                        return <PokeCard pokemon={pokemon} 
                                         id={pokemon.data.id} 
                                         key={pokemon.data.id} 
                                         isSelected={pokemon.data.id == expandedCard}
                                         onClick={handleClick}/>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default DexList;