import React, { useState, useEffect, useRef, onMouseEnter, onMouseLeave } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const PokeCard = (props) => {
  const pokemon = props.pokemon;
  const pokeData = pokemon.data;
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const sprite = pokeData.sprites.front_default;

  let bounds;
  const inputRef = useRef();
  const glowRef = useRef();
  const rotateToMouse = (e) => {
    bounds = inputRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    inputRef.current.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;
console.log(center.y / 100)
    glowRef.current.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;
  };
  const removeListener = (e) => {
    inputRef.current.style.transform = '';
    inputRef.current.style.background = '';
  };
  useEffect(() => {});

  return (
    <Card className='col-2 pokemon-card mr-5'>
      <Card.Header>
        <Card.Title><h5>{name}</h5></Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Img variant='bottom' src={sprite} />
      </Card.Body>
      <div className="glow" />
    </Card>
    // <ul className="card-container col-3">
    //   <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}}>
    //     <div className="card-header">
    //       <b>{name}</b>
    //     </div>
    //     <div className="card-body">          
    //       <h6 className="card-subtitle mb-2 text-muted">Id: {pokeData.id}</h6>  
    //       <h6 className="card-subtitle mb-2 text-muted">Height: {pokeData.height}</h6>  
    //       <h6 className="card-subtitle mb-2 text-muted">Weight: {pokeData.weight}</h6>   
    //       <h6 className="card-subtitle mb-2 text-muted">Experience: {pokeData.base_experience}</h6>  
    //     </div>
    //   </div>
    // </ul> 
  );
};

export default PokeCard;