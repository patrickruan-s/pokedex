import React, {useState, useEffect} from 'react';
import PokeCard from './PokeCard.js';
import { Button } from 'react-bootstrap';
import TypeButton from './TypeButton.js'

const PokemonTypeList = (props) => {

    const [typeUrl, settypeUrl] = useState(props.url)
    console.log(typeUrl)


    let pokemons = []
    fetch(typeUrl)
    .then(results => results.json())
    .then(pokemonType => {
        pokemonType.pokemon.forEach(poke => {
                fetch(poke.pokemon.url)
                .then(results => results.json())
                .then(pokemon => {
                    pokemons.push(pokemon);
                })
            })
        })
    console.log(pokemons)            
    return(
        <div>

            <div>
            {props.types.map(type => <TypeButton type={type}></TypeButton>)}
            </div>
        </div>
    );
}

export default PokemonTypeList;