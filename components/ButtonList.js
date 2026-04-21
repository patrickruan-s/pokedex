import React, {useState} from 'react';
import { Button } from 'react-bootstrap';


const ButtonList = (props) => {
  const repos = props.types;
  if (!repos || repos.length === 0) return <p>No repos, sorry</p>;
  return (
    <ul>
      {repos.map((repo) => {
        return (
          <li key={repo.url} className='list'>
            <Button>{repo.name}</Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ButtonList;