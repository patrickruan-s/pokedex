import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


const TypeButton = (props) => {

    return(
        <div>
        <ul>{props.type.name}</ul>
        </div>
    )
}



export default TypeButton;