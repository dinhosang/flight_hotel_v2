import React from 'react';

const SiteNav = (props) => {
  if(!props.display){
    return (
      <nav id="site-banner-nav" className="hidden">
        <ul>
          {props.navItems}
        </ul>
      </nav>
    )
  } else {
    return (
      <nav id="site-banner-nav">
        <ul>
          {props.navItems}
        </ul>
      </nav>
    )
  }
}

export {SiteNav as default};
