import React, { Fragment } from 'react';

import NavList from '../common_components/NavList.js';
import AnchorImage from '../common_components/AnchorImage.js';
import LanguageSelect from './LanguageSelect.js';

import logoImage from './logo.png';

const SiteBanner = (props) => {

  const logoObject = props.logoDetails
  const siteLogo = (
    <AnchorImage domainUrl={logoObject.url}
            image={logoImage}
            altText={logoObject.altText}
            handleClick={logoObject.handleClick}
            id={logoObject.id}
    />
  );
  const languageSelect = (
    <LanguageSelect {...props.langSelectDetails} />
  )

  return (
    <Fragment>
      {siteLogo}
      <NavList navItems={props.navItems} display={props.displayNav}/>
      {languageSelect}
    </Fragment>
  );
}

export {SiteBanner as default};
