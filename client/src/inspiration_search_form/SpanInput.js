import React from 'react';

const SpanInput = (props) => {
  return (
    <span className={props.classesString} id={props.id}>
      <label htmlFor={props.fieldId}>
        {props.labelString}
      </label>
      {props.children}
    </span>
  );
}

export {SpanInput as default};
