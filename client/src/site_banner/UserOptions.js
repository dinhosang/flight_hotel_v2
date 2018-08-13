import React from 'react';
import DetailsStateful from '../common_components/DetailsStateful.js';


const UserOptions = (props) => {

  const createList = (id, handleClickWrapper) => {
    return (
      <ul id={id}>
        <li key="1" onClick={handleClickWrapper.bind(this, "1")}>First</li>
        <li key="2" onClick={handleClickWrapper.bind(this, "2")}>Second</li>
        <li key="3" onClick={handleClickWrapper.bind(this, "3")}>Third</li>
      </ul>
    );
  }

  return (
    <DetailsStateful id="user-options"
        listId="user-options-list"
        createList={createList}
        handleClick={props.handleClick}
        summary={props.summary} />
  )

}

export {UserOptions as default};
