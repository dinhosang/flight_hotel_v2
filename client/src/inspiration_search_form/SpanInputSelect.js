import React from 'react';

import SpanInput from './SpanInput.js';

const SpanInputSelect = (props) => {
  return (
    <SpanInput {...props}>
      <select id={props.fieldId}
        name={props.fieldId}
        value={props.value}
        onChange={props.handleChange}>
          {props.children}
      </select>
    </SpanInput>
  );
}

export {SpanInputSelect as default};
