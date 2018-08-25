import React from 'react';

const NavList = (props) => {

  const classes = (typeof props.display === "undefined" || props.display) ? props.width : `hidden ${props.width}`;

  return (
    <nav id={props.id} className={classes}>
      <ul>
        {props.children}
      </ul>
    </nav>
  );
};

export {NavList as default};
