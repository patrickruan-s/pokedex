import React, {useState, useEffect} from 'react';
import PokeCard from './PokeCard';
import { Button } from 'react-bootstrap';

const DexList = (props) => {
    const pokemonList = props.pokemonList
    return(
        <div>
            {/* <div>
                <div>{console.log(pokemonList)}</div>
            </div> */}
            <ul>
                {pokemonList.map((pokemonData) => {
                    return <ul><PokeCard data={pokemonData}/></ul> ;
                })}
            </ul>
        </div>
    );
}

export default DexList;