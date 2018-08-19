import React from 'react';

const AnchorImage = (props) => {
  console.log(props.span);
  return (
    <a href={props.domainUrl} onClick={props.handleClick}
      id={props.id} className={props.span}>
      <img src={props.image} alt={props.altText} />
    </a>
  );
};

export {AnchorImage as default};
