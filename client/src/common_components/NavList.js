import React from 'react';

const NavList = (props) => {
  if(typeof props.display === "undefined" || props.display) {
    return (
      <nav id={props.id} className={props.width}>
        <ul>
          {props.navItems}
        </ul>
      </nav>
    );
  } else {
    return (
      <nav id={props.id} className={`hidden ${props.width}`}>
        <ul>
          {props.navItems}
        </ul>
      </nav>
    );
  }

};

export {NavList as default};
