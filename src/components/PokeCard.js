import { useRef, useCallback } from 'react';
import Card from 'react-bootstrap/Card';

const ANIMATION_CONFIG = {
  SCALE: 1.07,
  ROTATION_FACTOR: 100,
  ROTATION_MULTIPLIER: 2,
  GLOW_COLOR: '#ffffff55',
  SHADOW_COLOR: '#0000000f'
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PokeCard = ({ isSelected, pokemon, onClick }) => {
  const cardRef = useRef();
  const glowRef = useRef();
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !glowRef.current) return;

    const bounds = cardRef.current.getBoundingClientRect();
    const leftX = e.clientX - bounds.x;
    const topY = e.clientY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    cardRef.current.style.transform = `
      scale3d(${ANIMATION_CONFIG.SCALE}, ${ANIMATION_CONFIG.SCALE}, ${ANIMATION_CONFIG.SCALE})
      rotate3d(
        ${center.y / ANIMATION_CONFIG.ROTATION_FACTOR},
        ${-center.x / ANIMATION_CONFIG.ROTATION_FACTOR},
        0,
        ${Math.log(distance) * ANIMATION_CONFIG.ROTATION_MULTIPLIER}deg
      )
    `;

    glowRef.current.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        ${ANIMATION_CONFIG.GLOW_COLOR},
        ${ANIMATION_CONFIG.SHADOW_COLOR}
      )
    `;
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !glowRef.current) return;

    cardRef.current.style.transform = '';
    glowRef.current.style.backgroundImage = '';
  }, []);

  const handleClick = useCallback(() => {
    if (onClick && pokemon?.data?.id) {
      onClick(pokemon.data.id);
    }
  }, [onClick, pokemon?.data?.id]);

  if (!pokemon?.data) {
    return null;
  }

  const { data: pokeData, name } = pokemon;
  const displayName = capitalizeFirstLetter(name);
  const sprite = pokeData.sprites.front_default;
  const cardClasses = `${isSelected ? 'selected' : ''} pokemon-card mr-5 col-2`;

  return (
    <Card
      className={cardClasses}
      ref={cardRef}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <Card.Header>
        <Card.Title>
          <h5>{displayName}</h5>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Img
          variant='bottom'
          src={sprite}
          alt={`${displayName} sprite`}
        />
      </Card.Body>
      <div className="glow" ref={glowRef} />
    </Card>
  );
};

export default PokeCard;