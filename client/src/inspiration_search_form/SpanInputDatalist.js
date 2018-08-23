import React from 'react';

import SpanInput from './SpanInput.js';

const SpanInputDatalist = (props) => {
  return(
    <SpanInput {...props}>
      <input list={props.datalistId} id={props.fieldId} name={props.fieldId} value={props.value} onChange={props.handleChange}
      autoComplete="off" />
      <datalist id={props.datalistId}>
        {props.options}
      </datalist>
    </SpanInput>
  );
}

export {SpanInputDatalist as default};
