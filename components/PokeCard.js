import { useRef, useCallback } from 'react';
import TYPE_COLORS from './typeColors';

const ANIMATION_CONFIG = {
  SCALE: 1.06,
  ROTATION_FACTOR: 100,
  ROTATION_MULTIPLIER: 2,
  GLOW_COLOR: '#ffffff44',
  SHADOW_COLOR: '#0000000a'
};

const pad = (n) => String(n).padStart(3, '0');
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const PokeCard = ({ isSelected, pokemon, onClick }) => {
  const cardRef = useRef();
  const glowRef = useRef();

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !glowRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const center = {
      x: e.clientX - bounds.x - bounds.width / 2,
      y: e.clientY - bounds.y - bounds.height / 2,
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
        circle at ${center.x * 2 + bounds.width / 2}px ${center.y * 2 + bounds.height / 2}px,
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
    if (onClick && pokemon?.data?.id) onClick(pokemon.data.id);
  }, [onClick, pokemon?.data?.id]);

  if (!pokemon?.data) return null;

  const { data: pokeData, name } = pokemon;
  const types = pokeData.types.map(t => t.type.name);
  const primaryColor = TYPE_COLORS[types[0]] || '#9FA19F';
  const sprite = pokeData.sprites.front_default;

  return (
    <div
      className={`pokemon-card${isSelected ? ' selected' : ''}`}
      ref={cardRef}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className="card-type-bar" style={{ background: primaryColor }} />
      <div className="card-inner">
        <div className="card-number">#{pad(pokeData.id)}</div>
        <div className="card-name">{capitalize(name)}</div>
        <img className="card-sprite" src={sprite} alt={name} />
        <div className="card-type-badges">
          {types.map(type => (
            <span key={type} className="type-pip" style={{ background: TYPE_COLORS[type] || '#9FA19F' }}>
              {capitalize(type)}
            </span>
          ))}
        </div>
      </div>
      <div className="glow" ref={glowRef} />
    </div>
  );
};

export default PokeCard;
