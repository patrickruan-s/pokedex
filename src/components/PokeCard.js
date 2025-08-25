import React, { useState, useEffect, useRef, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { ThemeContext } from './Contexts.js';


const PokeCard = (props) => {
  const theme = useContext(ThemeContext);
  const selected = props.isSelected;
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

  const handleClick = () => {
    props.onClick(pokeData.id);
  }

  return (
    <Card className={`${selected ? 'selected' : ''} pokemon-card ${theme}-background mr-5 col-2`}
          ref={inputRef}
          onMouseLeave={removeListener}
          onMouseMove={rotateToMouse}
          onClick={handleClick}>
      <Card.Header>
        <Card.Title><h5>{name}</h5></Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Img variant='bottom' src={sprite} />
      </Card.Body>
      <div className="glow" ref={glowRef}/>
    </Card>
  );
};

export default PokeCard;