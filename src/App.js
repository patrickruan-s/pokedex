import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import LoadingAnimation from './components/LoadingAnimation.js';
import DexList from './components/DexList';
import { ThemeContext } from './components/Contexts.js';

function App() {
  const [theme, setTheme] = useState('light');
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
          const data = await fetch(obj.url).then(results => results.json());
          const abilities = await Promise.all(data.abilities.map(async (ability) => {
            const url = ability.ability.url;
            return {
              data: await fetch(url).then(results => results.json())
            }
          }));
          const pokeFlavorText = await fetch(data.species.url).then(results => results.json());
          return {
              ...obj,
              flavorTexts: pokeFlavorText.flavor_text_entries,
              abilities: abilities,
              data: data
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

  const updateTheme = () => {
    if(theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`App ${theme}-background`}>
      <div className="pokedex-header">
        <h1> POKEDEX </h1>
      </div>
      <div>
        <button onClick={updateTheme}>{theme}</button>
      </div>
      <div className="pokedex-body">
      <InfiniteScroll
        scrollableTarget='dex-list'
        dataLength={pokemonData.length}
        next={fetchData}
        hasMore={true}
        loader={<LoadingAnimation loading={loading} />}
        endMessage={<p>No more data to load.</p>}>
        <ThemeContext.Provider value={theme}>
          <DexList pokemonList={pokemonData} />
        </ThemeContext.Provider>
      </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
