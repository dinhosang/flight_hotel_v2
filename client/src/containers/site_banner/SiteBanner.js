import React, { Fragment } from 'react';

import SiteNav from './SiteNav.js';


const SiteBanner = (props) => {
  return (
    <Fragment>
      {props.logo}
      <SiteNav navItems={props.navItems} display={props.displayNav}/>
    </Fragment>
  );
}

export {SiteBanner as default};
