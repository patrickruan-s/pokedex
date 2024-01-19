
import React from 'react';

const PokeCard = (props) => {
  const {pokemon, id} = props
    return (
<ul className="card-container">
      <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}} key={id}>
        <div className="card-header"><b>{pokemon.name}</b></div>
        <div className="card-body">          
          <h6 className="card-subtitle mb-2 text-muted">Id: {pokemon.id}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Height: {pokemon.height}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Weight: {pokemon.weight}</h6>   
          <h6 className="card-subtitle mb-2 text-muted">Experience: {pokemon.base_experience}</h6>  

        </div>
        </div>
        </ul>
    )
};

export default PokeCard;