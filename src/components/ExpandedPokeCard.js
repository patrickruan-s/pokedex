import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import OnHoverText from './OnHoverText';

const ExpandedPokeCard = (props) => {
    if(props.pokemon == null) {
        return <div></div>
    } else {
        const pokemon = props.pokemon;
        const pokeData = pokemon.data;
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const sprite = pokeData.sprites.front_default;
        const abilities = pokemon.abilities;

        const capitalizeString = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }

        return (
            <Card className='expanded-card'>
                <Card.Header>
                    <Card.Title><h4>{name}</h4></Card.Title>
                </Card.Header>
                <Card.Body className='row'>
                    <Card className='col-6'>
                        <Card.Img variant='top' src={sprite} className='sprite-display'/>
                    </Card>
                    <Card className='col-5 meta-data'>
                        <Card.Text>
                            <div className='row' style={{textAlign: "center"}}>
                                <span style={{fontWeight: "bold"}}>Type:&nbsp;</span> 
                                <span>
                                    {pokeData.types.map(type => capitalizeString(type.type.name)).join(', ') }
                                </span>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <div className='row'>
                                <span style={{fontWeight: "bold"}}>Height: &nbsp;</span>
                                <span>
                                    {`${(pokeData.height * 0.328084).toFixed(2)} ft`}
                                </span>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <div className='row'>
                                <span style={{fontWeight: "bold"}}>Weight: &nbsp;</span>
                                <span>
                                    {`${(pokeData.weight * 0.220462).toFixed(2)} lbs`}
                                </span>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <div className='row abilities'>
                                <span style={{fontWeight: "bold"}}>Abilities: &nbsp;</span>
                                <span style={{position: 'absolute'}}>
                                    {abilities.map(ability => <OnHoverText key={ability.data.name} hoverContent={ability.data.flavor_text_entries[0].flavor_text} text={capitalizeString(ability.data.name)} />)}
                                </span>
                            </div>
                        </Card.Text>
                    </Card>
                </Card.Body>
                <Card.Body className='row' style={{paddingBottom: '20px'}}>
                    <Card className='col-8 display-body'>
                    </Card>
                    <Card className='col-3 moves' style={{width: '100px'}}>

                    </Card>
                </Card.Body>
            </Card>
        );
    }

}


export default ExpandedPokeCard;