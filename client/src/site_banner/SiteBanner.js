import React from 'react';

import NavList from '../common_components/NavList.js';
import AnchorImage from '../common_components/AnchorImage.js';
import LanguageSelect from './LanguageSelect.js';
import UserOptions from './UserOptions.js';

import logoImage from './logo.png';
import './SiteBanner.css';
import './details.css';

const SiteBanner = (props) => {

  // Use of ... allows a reduction of coupling as SiteBanner does not need to
  // know the individual keys on the prop objects, instead just passing
  // it wholesale, making future modifications easier to instate.
  const siteLogo = (
    <AnchorImage image={logoImage} {...props.logoDetails}/>
  );

  return (
    <header id="site-banner">
      <span className='col-span-3'/>
      {siteLogo}
      <NavList {...props.navDetails} id="site-banner-nav" display={props.displayNav}/>
      <LanguageSelect {...props.langSelectDetails} />
      <UserOptions {...props.userOptionsDetails} />
      <span className='col-span-3'/>
    </header>
  );
}

export {SiteBanner as default};
