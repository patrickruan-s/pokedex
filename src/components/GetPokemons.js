import React from 'react';
import PokeCard from './PokeCard';

const GetPokemons = (props) => {
    if (props.url == "") return <h1>no repos</h1>;
    let typeUrl = props.url;
    let mypokemons = [];
    fetch(typeUrl)
    .then(results => results.json())
    .then(pokemonType => {
        pokemonType.pokemon.forEach(poke => {
                fetch(poke.pokemon.url)
                .then(results => results.json())
                .then(pokemon => {
                    mypokemons.push(pokemon)
                })
        })
    })
    console.log(mypokemons);
    return(
        Object.keys(mypokemons).map(pokemon => <h1 key={mypokemons[pokemon].id}>{mypokemons[pokemon].name}</h1>)
      )
}

export default GetPokemons;