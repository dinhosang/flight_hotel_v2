import React, { Component } from 'react';
import nanoid from 'nanoid';

import SiteBanner from './site_banner/SiteBanner.js';
import ListAnchor from './common_components/ListAnchor.js';

import siteStrings from './resources/site_strings.js';

// import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayNav: false,
      language: "english",
      // grabs protocol and domain from browser, not including paths
      url: document.location.origin,
      handlers: this.createHandlers()
    };
  };

  handleClick = (value, event) => {
    event.preventDefault();

    switch (value) {
      case siteStrings.english.inspiration:

        break;
      default:

    };

    console.log(value);
  };

  handleLanguageSelectChange = (event) => {
    this.setState({language: event.target.value});
  }

  createHandlers = () => {
    const handlers = {};
    const navItemsValues = [
      siteStrings.english.homepage,
      siteStrings.english.inspiration,
      siteStrings.english.destination,
    ];

    // ensuring that when the handleClick method is invoked that a value
    // is passed through which will inform the method what element was clicked.
    navItemsValues.forEach((value) => {
      handlers[value] = this.handleClick.bind(this, value)
    });

    return handlers;
  }

  createSiteBannerNavItems = () => {
    const handlers = this.state.handlers;
    const language = this.state.language;
    const english = siteStrings.english;

    const searchTitle = (
      <li key={nanoid()}>
        {siteStrings[language].searchTitle}
      </li>
    );

    const inspirationLink = (
      <ListAnchor url={this.state.url} path="inspiration-search" handleClick={handlers[english.inspiration]} displayValue={siteStrings[language].inspiration} key={nanoid()} />
    );

    const destinationLink = (
      <ListAnchor url={this.state.url} path="destination-search" handleClick={handlers[english.destination]} displayValue={siteStrings[language].destination} key={nanoid()}/>
    );

    return [searchTitle, inspirationLink, destinationLink];
  }

  render() {
    // Preparing props for Logo component
    const logoDetails = {
      domainUrl: this.state.url,
      altText: siteStrings[this.state.language].altLogoImg,
      handleClick: this.state.handlers[siteStrings.english.homepage],
      id: "site-banner-logo"
    }


    // Preparing props for LanguageSelect component
    const supportedLangs = siteStrings.languages.sort();
    const languageConverterToOriginalLang = {};
    const languageConverterToCurrentLang = {};
    const currLang = this.state.language;

    supportedLangs.forEach((lang) => {
      const langInOrig = siteStrings[lang][lang];
      languageConverterToOriginalLang[lang] = langInOrig;
      languageConverterToCurrentLang[lang] = siteStrings[currLang][lang];
    })

    const langSelectDetails = {
      supportedLangs: supportedLangs,
      languageConverterToOriginalLang: languageConverterToOriginalLang,
      languageConverterToCurrentLang: languageConverterToCurrentLang,
      currentLang: currLang,
      handleChange: this.handleLanguageSelectChange,
      idCreater: nanoid
    }


    // Creation of SiteBanner
    return (
        <SiteBanner displayNav={this.state.displayNav}
                    logoDetails={logoDetails}
                    langSelectDetails={langSelectDetails}
                    navItems={this.createSiteBannerNavItems()}/>
    );
  }

}

export default App;
