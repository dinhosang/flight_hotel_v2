import React from 'react';

const SpanButton = (props) => {
  return (
    <span className={props.classesString}
      id={props.id}>
        <input type="submit"
          id={props.buttonId}
          className={props.buttonClassesString}
          value={props.buttonText} />
    </span>
  );
}

export {SpanButton as default};
