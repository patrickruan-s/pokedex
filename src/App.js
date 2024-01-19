import React, { useState, useEffect } from 'react';
import './App.css';
import { render } from '@testing-library/react';
import PokemonTypeList from './components/PokemonTypeList.js';
import ButtonList from './components/ButtonList';
import { Button } from 'react-bootstrap';
import TypeButton from './components/TypeButton.js';
import withListLoading from './components/withListLoading';

function App() {

  const List = withListLoading(ButtonList)

  const [appState, setAppState] = useState({
    loading: false,
    apiUrl:'https://pokeapi.co/api/v2/type/1/?limit=15&offset=15',
    types: null
  })

  useEffect(() => {
    setAppState({loading: true})
    const mytypes = getType()
    setAppState({loading:false, types: mytypes})
  }, [setAppState]);

  function getType() {
    let mytypes = []
    fetch('https://pokeapi.co/api/v2/type')
    .then(results => results.json())
    .then(pokemonType => {if (pokemonType) {
      let results = pokemonType.results
      results.forEach(result => {
        mytypes.push(result)
      })
      }
    });
   return mytypes
  }

 
  console.log(appState.types)
  return (
    <div className="App">
      <div className="pokedex-header">
        <h1> POKEDEX </h1>
      </div>
      <div> 
        <List isLoading={appState.loading} types={appState.types} />
      </div>
      <div className="pokedex-body">
        <DexList pokemons={myPokemons} />
      </div>
    </div>
  );
}

export default App;
