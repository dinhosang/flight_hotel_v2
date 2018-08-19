import React from 'react';

const Details = (props) => {
  let finalDetails;

  if(props.open) {
    finalDetails = (
      <details id={props.id} className={props.span} open>
        <summary onClick={props.handleClick}>
          {props.summary}
          <span className="dropdown-caret"></span>
        </summary>
        {props.children}
      </details>
    )
  } else {
    finalDetails = (
      <details id={props.id} className={props.span}>
        <summary onClick={props.handleClick}>
          {props.summary}
          <span className="dropdown-caret"></span>
        </summary>
        {props.children}
      </details>
    )
  }

  return finalDetails;
}

export {Details as default};
