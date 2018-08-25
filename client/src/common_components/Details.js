import React from 'react';

const Details = (props) => {
  return (
    <details id={props.id} className={props.span} open={props.open}>
      <summary onClick={props.handleClick}>
        {props.summary}
        <span className="dropdown-caret"></span>
      </summary>
      {props.children}
    </details>
  )
}

export {Details as default};
