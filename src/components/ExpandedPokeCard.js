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

        const capitalizeString = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return (
            <Card className='expanded-card'>
                <Card.Header>
                    <Card.Title><h5>{name}</h5></Card.Title>
                </Card.Header>
                <Card.Body className='row'>
                    <Card className='col-6'>
                        <Card.Img variant='top' src={sprite} />
                    </Card>
                    <Card className='col-5 meta-data'>
                        <Card.Text>
                            <div className='row' style={{textAlign: "center"}}>
                            <h5>Type:&nbsp;</h5> 
                                <p>
                                    {pokeData.types.map(type => capitalizeString(type.type.name)).join(', ') }
                                </p>
                            </div>
                        </Card.Text>
                        <Card.Text className='row'>
                            <h6></h6>
                        </Card.Text>
                    </Card>
                </Card.Body>
            </Card>
        );
    }

}


export default ExpandedPokeCard;