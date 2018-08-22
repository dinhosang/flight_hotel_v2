import React from 'react';

const SpanButton = (props) => {
  return (
    <span className={props.classesString}
      id={props.id}>
        <button type="button"
          id={props.buttonId}
          className={props.buttonClassesString}>
            {props.buttonText}
        </button>
    </span>
  );
}

export {SpanButton as default};
