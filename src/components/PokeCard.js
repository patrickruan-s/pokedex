import React, { useState, useEffect } from 'react';

const PokeCard = (props) => {
  const pokemon = props.pokemon;
  const pokeData = pokemon.data;
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <ul className="card-container col-3">
      <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}}>
        <div className="card-header">
          <b>{name}</b>
        </div>
        <div className="card-body">          
          <h6 className="card-subtitle mb-2 text-muted">Id: {pokeData.id}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Height: {pokeData.height}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Weight: {pokeData.weight}</h6>   
          <h6 className="card-subtitle mb-2 text-muted">Experience: {pokeData.base_experience}</h6>  
        </div>
      </div>
    </ul>
    );
};

export default PokeCard;