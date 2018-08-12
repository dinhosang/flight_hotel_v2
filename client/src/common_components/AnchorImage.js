import React from 'react';

const AnchorImage = (props) => {
  return (
    <a href={props.domainUrl} onClick={props.handleClick}>
      <img src={props.image} alt={props.altText} />
    </a>
  );
};

export {AnchorImage as default};
