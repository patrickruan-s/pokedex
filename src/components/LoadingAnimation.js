import React from 'react';

const LoadingAnimation = (props) => {
    if(props.loading) {
        return(
            <div className='loader row'>
                <p className='col-2'>Loading Pokemons</p>
                <div className='col-1'>"
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default LoadingAnimation;