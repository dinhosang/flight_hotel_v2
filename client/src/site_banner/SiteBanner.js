import React, { Fragment } from 'react';

import NavList from '../common_components/NavList.js';
import AnchorImage from '../common_components/AnchorImage.js';
import LanguageSelect from './LanguageSelect.js';
import UserOptions from './UserOptions.js';

import logoImage from './logo.png';

const SiteBanner = (props) => {

  // Use of ... allows a reduction of coupling as SiteBanner does not need to
  // know the individual keys on the prop objects, instead just passing
  // it wholesale, making future modifications easier to instate.
  const siteLogo = (
    <AnchorImage image={logoImage} {...props.logoDetails} />
  );
  const languageSelect = (
    <LanguageSelect {...props.langSelectDetails} />
  )
  const userOptions = (
    <UserOptions {...props.userOptionsDetails} />
  )

  return (
    <Fragment>
      {siteLogo}
      <p>{props.searchTitle}</p>
      <NavList navItems={props.navItems} display={props.displayNav}/>
      {languageSelect}
      {userOptions}
    </Fragment>
  );
}

export {SiteBanner as default};
