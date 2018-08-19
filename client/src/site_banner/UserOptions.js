import React from 'react';
import DetailsStateful from '../common_components/DetailsStateful.js';

const UserOptions = (props) => {

  const createList = (id, handleClickWrapper) => {
    return (
      <ul id={id}>
        <li key="1" tabIndex="0" onClick={handleClickWrapper.bind(this, "1")}>
          <a>First</a>
        </li>
        <li key="2" tabIndex="0" onClick={handleClickWrapper.bind(this, "2")}>
          <a>Second</a>
        </li>
        <li key="3" tabIndex="0" onClick={handleClickWrapper.bind(this, "3")}>
          <a>Third</a>
        </li>
      </ul>
    );
  }

  return (
    <DetailsStateful id="user-options"
        listId="user-options-list"
        createList={createList}
        handleClick={props.handleClick}
        summary={props.summary}
        span={props.span} />
  )

}

export {UserOptions as default};
