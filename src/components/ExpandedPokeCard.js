import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const ExpandedPokeCard = (props) => {
    if(props.pokemon == null) {
        return <div></div>
    } else {
        const pokemon = props.pokemon;
        const pokeData = pokemon.data;
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const sprite = pokeData.sprites.front_default;
        return (
            <Card className='expanded-card'>
                <Card.Header>
                <Card.Title><h5>{name}</h5></Card.Title>
                </Card.Header>
                <Card.Body>
                <Card.Img variant='bottom' src={sprite} />
                </Card.Body>
            </Card>
        );
    }

}


export default ExpandedPokeCard;