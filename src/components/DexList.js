import React, {useState, useEffect} from 'react';
import PokeCard from './PokeCard';
import { Button } from 'react-bootstrap';

const DexList = (props) => {
    const pokemonData = props.pokemonList;

    return(
        <div>
            <div className='row dex-row'>
                {pokemonData.map(pokemon => {

                    return <PokeCard pokemon={pokemon} key={pokemon.data.id} />
                })}
            </div>
        </div>
    );
}

export default DexList;