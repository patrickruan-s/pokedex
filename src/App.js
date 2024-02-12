import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import ButtonList from './components/ButtonList';
import TypeButton from './components/TypeButton.js';
import LoadingAnimation from './components/LoadingAnimation.js';
import DexList from './components/DexList';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const offset = (page) * 24;
    try {
      const oldData = pokemonData;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=24&offset=${offset}`)
      const pokemon = await response.json()
      const newData = await Promise.all(pokemon.results.map(async (obj) => {
          return {
              ...obj,
              data: await fetch(obj.url).then(results => results.json())
          }
        }));
      setPokemonData([...oldData, ...newData]);
      setPage(page + 1);
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {  
    fetchData();
  }, []);

  const dexList = <DexList pokemonList={pokemonData} isLoading={loading}/>;

  return (
    <div className="App">
      <div className="pokedex-header">
        <h1> POKEDEX </h1>
      </div>
      <div className="pokedex-body">
      <InfiniteScroll
        scrollableTarget='dex-list'
        dataLength={pokemonData.length}
        next={fetchData}
        hasMore={true} // Replace with a condition based on your data source
        loader={<LoadingAnimation />}
        endMessage={<p>No more data to load.</p>}>
        <DexList pokemonList={pokemonData} />
      </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
