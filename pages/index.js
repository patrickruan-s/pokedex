import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';
import LoadingAnimation from '../components/LoadingAnimation.js';
import DexList from '../components/DexList';
import TypeFilter from '../components/TypeFilter';
import SearchBar from '../components/SearchBar';

const PAGE_SIZE = 24;

const fetchFullPokemon = async (name, url) => {
  const data = await fetch(url).then(r => r.json());
  const abilities = await Promise.all(
    data.abilities.map(async ({ ability }) => ({
      data: await fetch(ability.url).then(r => r.json())
    }))
  );
  const flavorData = await fetch(data.species.url).then(r => r.json());
  return { name, url, flavorTexts: flavorData.flavor_text_entries, abilities, data };
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [typeResults, setTypeResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`);
      const { results } = await res.json();
      const newData = await Promise.all(results.map(({ name, url }) => fetchFullPokemon(name, url)));
      setPokemonData(prev => [...prev, ...newData]);
      setPage(p => p + 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = async (type) => {
    if (!type) {
      setSelectedType('');
      setTypeList([]);
      setTypeResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!res.ok) throw new Error('Failed to filter by type');
      const { pokemon: all } = await res.json();
      const fullData = await Promise.all(
        all.slice(0, PAGE_SIZE).map(({ pokemon: p }) => fetchFullPokemon(p.name, p.url))
      );
      setTypeList(all);
      setSelectedType(type);
      setTypeResults(fullData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreTypeResults = async () => {
    if (!selectedType || loading) return;
    setLoading(true);
    try {
      const next = typeList.slice(typeResults.length, typeResults.length + PAGE_SIZE);
      const fullData = await Promise.all(
        next.map(({ pokemon: p }) => fetchFullPokemon(p.name, p.url))
      );
      setTypeResults(prev => [...prev, ...fullData]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Search failed');
      setSearchResults(data.results);
      setIsSearchMode(true);
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

  useEffect(() => { fetchData(); }, []);

  const displayList = isSearchMode ? searchResults : selectedType ? typeResults : pokemonData;
  const hasMore = selectedType ? typeResults.length < typeList.length : !isSearchMode;

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
            {!isSearchMode && pokemonData.length > 0 && `${pokemonData.length} loaded`}
          </span>
        </header>

        <div className="pokedex-body">
          <SearchBar onSearch={handleSearch} loading={searchLoading} />

          {isSearchMode ? (
            <div className="results-bar">
              <button className="btn-back" onClick={clearSearch}>← Browse</button>
              <span className="results-count">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </span>
            </div>
          ) : (
            <TypeFilter onTypeChange={handleTypeChange} selectedType={selectedType} />
          )}

          {error && (
            <div style={{ color: '#DC143C', fontSize: 13, marginBottom: 12 }}>
              {error.message}
            </div>
          )}

          <InfiniteScroll
            scrollableTarget="dex-list"
            dataLength={displayList.length}
            next={selectedType ? fetchMoreTypeResults : fetchData}
            hasMore={hasMore}
            loader={<LoadingAnimation loading={loading} />}
          >
            {loading && displayList.length === 0 && <LoadingAnimation loading={true} />}
            <DexList pokemonList={displayList} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
