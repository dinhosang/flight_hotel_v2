import React from 'react';

import SpanInput from './SpanInput.js';

const SpanInputDate = (props) => {
  return(
    <SpanInput {...props}>
      <input id={props.fieldId} type="date"
        onChange={props.handleChange}
        value={props.value || ""}
        name={props.fieldId} />
    </SpanInput>
  );
}

export {SpanInputDate as default};
