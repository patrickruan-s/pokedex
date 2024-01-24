import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonTypeList from './components/PokemonTypeList.js';
import ButtonList from './components/ButtonList';
import { Button } from 'react-bootstrap';
import TypeButton from './components/TypeButton.js';
import withListLoading from './components/withListLoading';
import DexList from './components/DexList';

function App() {
  const List = withListLoading(ButtonList);

  const [pokemonData, setPokemonData] = useState([])
  const [pokemonUrls, setPokemonUrls] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  
    const fetchData = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25")
      const pokemon = await response.json()
      const pokeData = await Promise.all(pokemon.results.map(async (obj) => {
          return {
              ...obj,
              sprite: await fetch(obj.url).then(results => results.json())
          }
        }));
      setPokemonData(pokeData);
  }

    
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <div className="pokedex-header">
        <h1> POKEDEX </h1>
      </div>
      <div>
        {console.log(pokemonData)}
      </div>
      <div className="pokedex-body">
        <DexList pokemonList={pokemonData} />
      </div>
    </div>
  );
}

export default App;
