import React from 'react';

import SpanInput from './SpanInput.js';

const SpanInputCheckbox = (props) => {
  return (
    <SpanInput {...props}>
        <input id={props.fieldId} type="checkbox"
           checked={props.isChecked}
           onChange={props.handleChange}
           name={props.fieldId} />
    </SpanInput>
  );
}


export {SpanInputCheckbox as default};
