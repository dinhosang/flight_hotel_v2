import React from 'react';

const ErrorSpan = (props) => {
  return (
    <span className="error-span col-span-6">
      {props.children}
    </span>
  );
}

export {ErrorSpan as default};
