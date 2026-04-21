// API route for fetching Pokemon data
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { limit = 24, offset = 0 } = req.query;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    const pokemon = await response.json();

    const detailedPokemon = await Promise.all(
      pokemon.results.map(async (obj) => {
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
      })
    );

    res.status(200).json({
      results: detailedPokemon,
      count: pokemon.count,
      next: pokemon.next,
      previous: pokemon.previous
    });
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}