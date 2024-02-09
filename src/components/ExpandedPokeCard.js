import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const ExpandedPokeCard = (props) => {
    const handleClick = () => {
        console.log('click');
        props.onClick(props.id);
    }

    debugger

    return (
        <Card className='expanded-card'>
            expanded
        </Card>
      );

}


export default ExpandedPokeCard;