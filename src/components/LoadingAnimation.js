import React from 'react';
import { CircleLoader} from "react-awesome-loaders"


const LoadingAnimation = (props) => {
    return(
        <div className='loader row'>
            <p className='col-2'>Loading Pokemons</p>
            <div className='col-1'>
            <CircleLoader
                meshColor={"#6366F1"}
                lightColor={"#E0E7FF"}
                duration={1.5}
                desktopSize={"25px"}
                mobileSize={"64px"}
            />
            </div>
        </div>
    );
};

export default LoadingAnimation;