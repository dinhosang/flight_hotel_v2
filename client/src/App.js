import React, { Component, Fragment } from 'react';
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
      currentLanguage: "english",
      // grabs protocol and domain from browser, not including paths
      domain: document.location.origin
    };
  }

  // Exists as the creation of the SiteBanner requires state values
  // to already exist to then reference. State may move out of this component
  // for something like language and domain, wish values that Exist
  // in state to only be found once and then retrieved. Having two instances
  // of say a domain being determined feels like it could leave the site open
  // to future trouble, especially as it is built upon and modified/updated.
  componentDidMount() {
    this.setState({
      siteBanner: this.createSiteBannerComponent()
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.currentLanguage !== this.state.currentLanguage) {
      this.setState({
        siteBanner: this.createSiteBannerComponent()
      })
    }
  }


  handleClickSearchType = (value, event) => {
    event.preventDefault();

    switch (value) {
      case siteStrings.english.inspiration:

        break;
      default:

    };

    console.log(value);
  };

  handleClickBannerLanguageSelectChange = (value) => {
    this.setState({
      currentLanguage: value
    })
  }


  createSiteBannerComponent = () => {
    const currentLang = this.state.currentLanguage

    const logoDetails = {
      domainUrl: this.state.domain,
      altText: siteStrings[currentLang].altLogoImg,
      handleClick: this.handleClickSearchType.bind(this, siteStrings.english.homepage),
      id: "site-banner-logo"
    }

    const prepareLanguageSelectDetails = () => {
      const supportedLangs = siteStrings.languages.sort();
      const languageConverterToOriginalLang = {};
      const languageConverterToCurrentLang = {};
      const wordForLanguage = siteStrings[currentLang].wordForLanguage;

      const wrapperForOnClick = (value) => {
        this.handleClickBannerLanguageSelectChange(value);
      }

      supportedLangs.forEach((lang) => {
        const langInOrig = siteStrings[lang][lang];
        languageConverterToOriginalLang[lang] = langInOrig;
        languageConverterToCurrentLang[lang] = siteStrings[currentLang][lang];
      })

      return {
        supportedLangs: supportedLangs,
        languageConverterToOriginalLang: languageConverterToOriginalLang,
        languageConverterToCurrentLang: languageConverterToCurrentLang,
        currentLang: currentLang,
        handleClickAppWrapper: wrapperForOnClick,
        idCreater: nanoid,
        currentLangWordForEnglishWordLanguage: wordForLanguage,
      }
    }
    const languageSelectDetails = prepareLanguageSelectDetails()

    const createSiteBannerNavItems = () => {
      const language = this.state.currentLanguage;
      const english = siteStrings.english;
      const searchTypes = siteStrings.searchTypes;

      return searchTypes.map((searchType) => {
        const handleClick = this.handleClickSearchType.bind(this, english[searchType]);
        return (
          <ListAnchor url={this.state.domain}
            path={siteStrings.searchPaths[searchType]}
            handleClick={handleClick}
            displayValue={siteStrings[language][searchType]} key={nanoid()} />
        )
      })
    }
    const navItems = createSiteBannerNavItems();

    return (
      <SiteBanner displayNav={this.state.displayNav}
                  logoDetails={logoDetails}
                  langSelectDetails={languageSelectDetails}
                  navItems={navItems}
                  searchTitle={siteStrings[currentLang].searchTitle}/>
    )
  }


  render() {

    return (
      <Fragment>
        {this.state.siteBanner}
      </Fragment>
    )
  }

}

export default App;
