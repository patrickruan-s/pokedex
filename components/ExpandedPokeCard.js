import OnHoverText from './OnHoverText';
import TYPE_COLORS from './typeColors';

const pad = (n) => String(n).padStart(3, '0');
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const STAT_LABELS = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
};

const statColor = (value) => {
  if (value >= 120) return '#3FA129';
  if (value >= 80) return '#6AB04C';
  if (value >= 50) return '#FAC000';
  if (value >= 30) return '#E67E22';
  return '#E62829';
};

const findFirstEnglishEntry = (flavorTexts) => {
  for (const t of flavorTexts) {
    if (t.language.name === 'en') return t.flavor_text.replace(/\f/g, ' ');
  }
  return '';
};

const ExpandedPokeCard = ({ pokemon }) => {
  if (!pokemon) return null;

  const { data: pokeData, name, abilities, flavorTexts } = pokemon;
  const types = pokeData.types.map(t => t.type.name);
  const primaryColor = TYPE_COLORS[types[0]] || '#9FA19F';
  const sprite = pokeData.sprites.front_default;
  const flavorText = findFirstEnglishEntry(flavorTexts);

  return (
    <div className="expanded-card">
      <div className="expanded-type-bar" style={{ background: primaryColor }} />

      <div className="expanded-header">
        <h4>{capitalize(name)}</h4>
        <span className="expanded-number">#{pad(pokeData.id)}</span>
      </div>

      <div className="expanded-sprite-section">
        <img className="expanded-sprite" src={sprite} alt={name} />
      </div>

      <div className="expanded-meta">
        <div className="meta-row">
          <span className="meta-label">Type</span>
          <span className="meta-value">
            {types.map(type => (
              <span key={type} className="type-pip" style={{ background: TYPE_COLORS[type] || '#9FA19F' }}>
                {capitalize(type)}
              </span>
            ))}
          </span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Height</span>
          <span className="meta-value">{(pokeData.height * 0.328084).toFixed(1)} ft</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Weight</span>
          <span className="meta-value">{(pokeData.weight * 0.220462).toFixed(1)} lbs</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Abilities</span>
          <span className="meta-value" style={{ gap: '8px' }}>
            {abilities.map(ability => (
              <OnHoverText
                key={ability.data.name}
                hoverContent={findFirstEnglishEntry(ability.data.flavor_text_entries)}
                text={capitalize(ability.data.name)}
              />
            ))}
          </span>
        </div>
      </div>

      {flavorText && (
        <div className="flavor-section">
          "{flavorText}"
        </div>
      )}

      <div className="stats-section">
        <div className="stats-title">Base Stats</div>
        {pokeData.stats.map(stat => {
          const label = STAT_LABELS[stat.stat.name] || stat.stat.name.toUpperCase();
          const value = stat.base_stat;
          const pct = Math.min((value / 255) * 100, 100);
          return (
            <div key={stat.stat.name} className="stat-bar-row">
              <span className="stat-name">{label}</span>
              <span className="stat-value">{value}</span>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${pct}%`, background: statColor(value) }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandedPokeCard;
