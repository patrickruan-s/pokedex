import React from 'react';
import { Audio } from 'react-loader-spinner'

const LoadingAnimation = (props) => {
    const loading = props.loading;
    if(loading) {
        return(
            <div className='loader row'>
                <p className='col-2'>Loading Pokemons</p>
                <div className='col-1'>
                    <Audio
                        height="30"
                        width="10"
                        radius="10"
                        color="green"
                    />
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
};

export default LoadingAnimation;