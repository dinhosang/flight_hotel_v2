import React from 'react';

const ListAnchor = (props) => {
  return (
    <li>
      <a href={`${props.url}/${props.path}`} onClick={props.handleClick}>
        {props.displayValue}
      </a>
    </li>
  );
}

export {ListAnchor as default};
