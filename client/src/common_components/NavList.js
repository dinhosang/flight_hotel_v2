import React from 'react';

const NavList = (props) => {
  if(props.display === "undefined" || props.display) {
    return (
      <nav id={props.id}>
        <ul>
          {props.navItems}
        </ul>
      </nav>
    );
  } else {
    return (
      <nav id={props.id} className="hidden">
        <ul>
          {props.navItems}
        </ul>
      </nav>
    );
  }

};

export {NavList as default};