"use strict";
(() => {
var exports = {};
exports.id = 198;
exports.ids = [198];
exports.modules = {

/***/ 122:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
// API route for searching Pokemon
async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }
    const { q , type , limit =20  } = req.query;
    if (!q && !type) {
        return res.status(400).json({
            message: "Search query or type filter required"
        });
    }
    try {
        let searchResults = [];
        // If searching by name/ID
        if (q) {
            // Try to get Pokemon by exact name first
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${q.toLowerCase()}`);
                if (response.ok) {
                    const pokemon = await response.json();
                    const abilities = await Promise.all(pokemon.abilities.map(async (ability)=>{
                        const url = ability.ability.url;
                        return {
                            data: await fetch(url).then((results)=>results.json())
                        };
                    }));
                    const pokeFlavorText = await fetch(pokemon.species.url).then((results)=>results.json());
                    searchResults.push({
                        name: pokemon.name,
                        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
                        flavorTexts: pokeFlavorText.flavor_text_entries,
                        abilities: abilities,
                        data: pokemon
                    });
                }
            } catch (error) {
            // If exact match fails, we'll fall back to broader search below
            }
            // If no exact match and query looks like it could be partial name
            if (searchResults.length === 0 && isNaN(q)) {
                // For demo purposes, we'll fetch first 500 Pokemon and filter client-side
                // In production, you'd want a proper search index
                const response1 = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=500");
                const allPokemon = await response1.json();
                const matchingPokemon = allPokemon.results.filter((pokemon)=>pokemon.name.toLowerCase().includes(q.toLowerCase())).slice(0, parseInt(limit));
                // Fetch detailed data for matching Pokemon
                const detailedResults = await Promise.all(matchingPokemon.map(async (pokemon)=>{
                    const data = await fetch(pokemon.url).then((results)=>results.json());
                    const abilities = await Promise.all(data.abilities.map(async (ability)=>{
                        const url = ability.ability.url;
                        return {
                            data: await fetch(url).then((results)=>results.json())
                        };
                    }));
                    const pokeFlavorText = await fetch(data.species.url).then((results)=>results.json());
                    return {
                        ...pokemon,
                        flavorTexts: pokeFlavorText.flavor_text_entries,
                        abilities: abilities,
                        data: data
                    };
                }));
                searchResults = detailedResults;
            }
        }
        // If searching by type
        if (type && searchResults.length === 0) {
            const response2 = await fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
            if (response2.ok) {
                const typeData = await response2.json();
                const typePokemon = typeData.pokemon.slice(0, parseInt(limit));
                const detailedResults1 = await Promise.all(typePokemon.map(async (item)=>{
                    const data = await fetch(item.pokemon.url).then((results)=>results.json());
                    const abilities = await Promise.all(data.abilities.map(async (ability)=>{
                        const url = ability.ability.url;
                        return {
                            data: await fetch(url).then((results)=>results.json())
                        };
                    }));
                    const pokeFlavorText = await fetch(data.species.url).then((results)=>results.json());
                    return {
                        name: item.pokemon.name,
                        url: item.pokemon.url,
                        flavorTexts: pokeFlavorText.flavor_text_entries,
                        abilities: abilities,
                        data: data
                    };
                }));
                searchResults = detailedResults1;
            }
        }
        res.status(200).json({
            results: searchResults,
            query: q,
            type: type,
            count: searchResults.length
        });
    } catch (error1) {
        console.error("Error searching Pokemon:", error1);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(122));
module.exports = __webpack_exports__;

})();