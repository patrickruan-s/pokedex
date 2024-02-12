import React from 'react';
import { CircleLoader} from "react-awesome-loaders"


const LoadingAnimation = (props) => {
    if(props.loading) {
        return(
            <div className='loader row'>
                <p className='col-2'>Loading Pokemons</p>
                <div className='col-1'>
                    <CircleLoader
                        meshColor={"#6366F1"}
                        lightColor={"#E0E7FF"}
                        duration={1.5}
                        desktopSize={"10px"}
                        mobileSize={"10px"}
                    />
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default LoadingAnimation;