import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const OnHoverText = (props) => {
    const [style, setStyle] = useState({opacity: 0, height: '0px'});
    const text = props.text;
    const hoverContent = props.hoverContent;

    return(
        <div className='hoverable-text'>
            <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content={hoverContent}
                data-tooltip-place="top">  
                {text}          
            </div>
            <Tooltip id="my-tooltip" >
                {hoverContent}
            </Tooltip>
        </div>
    )
}

export default OnHoverText;