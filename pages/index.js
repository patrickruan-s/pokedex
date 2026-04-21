import React, { useState, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';
import LoadingAnimation from '../components/LoadingAnimation.js';
import DexList from '../components/DexList';
import TypeFilter from '../components/TypeFilter';
import SearchBar from '../components/SearchBar';
import { ThemeContext } from '../components/Contexts.js';

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const offset = page * 24;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=24&offset=${offset}`);
      const pokemon = await response.json();
      const newData = await Promise.all(pokemon.results.map(async (obj) => {
        const data = await fetch(obj.url).then(r => r.json());
        const abilities = await Promise.all(data.abilities.map(async (ability) => ({
          data: await fetch(ability.ability.url).then(r => r.json())
        })));
        const pokeFlavorText = await fetch(data.species.url).then(r => r.json());
        return { ...obj, flavorTexts: pokeFlavorText.flavor_text_entries, abilities, data };
      }));
      setPokemonData(prev => [...prev, ...newData]);
      setPage(p => p + 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPokemon = useMemo(() => {
    if (!selectedType) return pokemonData;
    return pokemonData.filter(p => p.data.types.some(t => t.type.name === selectedType));
  }, [pokemonData, selectedType]);

  const handleSearch = async (query) => {
    setSearchLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data.results);
        setIsSearchMode(true);
      } else {
        setError(new Error(data.message || 'Search failed'));
      }
    } catch (err) {
      setError(err);
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setIsSearchMode(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Pokédex</title>
        <meta name="description" content="Browse and search Pokémon with detailed stats" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="App">
        <header className="pokedex-header">
          <img className="header-logo" src="/images/pokeball.png" alt="Pokeball" />
          <h1>Pokédex</h1>
          <span className="header-subtitle">
            {pokemonData.length > 0 && !isSearchMode ? `${pokemonData.length} loaded` : ''}
          </span>
        </header>

        <div className="pokedex-body">
          <ThemeContext.Provider value="light">
            <SearchBar onSearch={handleSearch} loading={searchLoading} />

            {isSearchMode ? (
              <div className="results-bar">
                <button className="btn-back" onClick={clearSearch}>← Browse</button>
                <span className="results-count">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
              </div>
            ) : (
              <TypeFilter onTypeChange={setSelectedType} selectedType={selectedType} />
            )}

            {error && (
              <div style={{ color: '#DC143C', fontSize: 13, marginBottom: 12 }}>
                Error: {error.message}
              </div>
            )}

            {isSearchMode ? (
              <DexList pokemonList={searchResults} />
            ) : (
              <InfiniteScroll
                scrollableTarget="dex-list"
                dataLength={pokemonData.length}
                next={fetchData}
                hasMore={true}
                loader={<LoadingAnimation loading={loading} />}
                endMessage={<p style={{ textAlign: 'center', color: '#6b7280', fontSize: 13 }}>All caught!</p>}
              >
                <DexList pokemonList={filteredPokemon} />
              </InfiniteScroll>
            )}
          </ThemeContext.Provider>
        </div>
      </div>
    </>
  );
}
