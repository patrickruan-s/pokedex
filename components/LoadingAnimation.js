import React from 'react';

const LoadingAnimation = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="loader">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="3" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="#DC143C" strokeWidth="3" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
        </path>
      </svg>
      Loading Pokémon…
    </div>
  );
};

export default LoadingAnimation;
