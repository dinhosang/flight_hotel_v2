import React, { Fragment } from 'react';

import NavList from '../common_components/NavList.js';


const SiteBanner = (props) => {
  return (
    <Fragment>
      {props.logo}
      <NavList navItems={props.navItems} display={props.displayNav}/>
    </Fragment>
  );
}

export {SiteBanner as default};
