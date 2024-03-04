import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import OnHoverText from './OnHoverText';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const ExpandedPokeCard = (props) => {
    if(props.pokemon == null) {
        return <div></div>
    } else {
        const capitalizeString = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
  
        const findFirstEnglishEntry = (flavorTexts) => {
            var enText = '';
            flavorTexts.forEach((text) => {
                if(text.language.name == 'en') {
                    enText = text.flavor_text;
                    return false
                }
            });
            return enText;
        }
  
        const getStats = () => {
            var data = pokeData.stats.map((stat) => {
                return stat.base_stat;
            });
            var stats = {
                labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
                datasets: [
                  {
                    label: 'Base Stats',
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 0.5,
                  },
                ],
            };
            return stats;
        }

        const pokemon = props.pokemon;
        const pokeData = pokemon.data;
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const sprite = pokeData.sprites.front_default;
        const abilities = pokemon.abilities;
        const stats = getStats();
        
        return (
            <Card className='expanded-card' border='primary'>
                <Card.Header>
                    <Card.Title><h4>{name}</h4></Card.Title>
                </Card.Header>
                <Card.Body className='row display-top-row'>
                    <Card className='col-5' border='success'>
                        <Card.Img variant='top' src={sprite} className='sprite-display'/>
                    </Card>
                    <Card className='col-6 meta-data' border='success'>
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
                                <span className='col' style={{width: 'fit-content'}}>
                                    {abilities.map(ability => <OnHoverText className='row' key={ability.data.name} hoverContent={findFirstEnglishEntry(ability.data.flavor_text_entries)} text={capitalizeString(ability.data.name)} />)}
                                </span>
                            </div>
                        </Card.Text>
                    </Card>
                </Card.Body>
                <Card.Body className='row display-bottom-row' style={{paddingBottom: '20px'}}>
                    <Card className='col-7 flavor-text'  border='success'>
                        {findFirstEnglishEntry(pokemon.flavorTexts)}
                    </Card>
                    <Card className='col-4 stats' border='success' style={{width: '100px'}}>
                        <Radar data={stats}></Radar>
                    </Card>
                </Card.Body>
            </Card>
        );
    }

}


export default ExpandedPokeCard;