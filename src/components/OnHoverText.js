import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const OnHoverText = (props) => {
    const [style, setStyle] = useState({opacity: 0, height: '0px'});
    const text = props.text;
    const hoverContent = props.hoverContent;

    return(
            <div className='hoverable-text'
            onMouseEnter={e => {
                setStyle({opacity: 1, height: '50px'});
            }}
            onMouseLeave={e => {
                setStyle({opacity: 0, height: '0px'})
            }}>
                {text}
                <Card className='hoverable-content' style={style}>{hoverContent}</Card>
            </div>
    )
}

export default OnHoverText;