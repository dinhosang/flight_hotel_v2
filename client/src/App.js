import React, { Component, Fragment } from 'react';
import nanoid from 'nanoid';

import SiteBanner from './site_banner/SiteBanner.js';
import ListAnchor from './common_components/ListAnchor.js';
import SiteMain from './site_main/SiteMain.js';

import siteStrings from './resources/site_strings.js';

import './normalize.css';
import './App.css';

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

  // below needs to contain any components that are rendered in the render() of
  // this component who receive props from this state. This ensures that when
  // state is updated that all relevent components are also updated and
  // re-rendered.
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
      id: "site-banner-logo",
      span: "col-span-1"
    }

    const prepareLanguageSelectDetails = () => {
      const supportedLangs = siteStrings.languages.sort();
      const languageConverterToOriginalLang = {};
      const languageConverterToCurrentLang = {};
      const wordForLanguage = siteStrings[currentLang].wordForLanguage;

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
        handleClick: this.handleClickBannerLanguageSelectChange,
        keyCreater: nanoid,
        summary: wordForLanguage,
        span: "col-span-1"
        // would be nice to have these ids also be constants
        // but would need a way to use same constants in css file
        // perhaps SASS can do that?
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
    const navDetails = {
      navItems: navItems,
      width: "col-span-7"
    }
    const userOptionsDetails = {
      summary: "User",
      span: "col-span-1",
      handleClick: (value) => {
        console.log(value);
      }
    }
    return (
      <SiteBanner displayNav={this.state.displayNav}
                  logoDetails={logoDetails}
                  langSelectDetails={languageSelectDetails}
                  userOptionsDetails={userOptionsDetails}
                  navDetails={navDetails}/>
    )
  }


  render() {

    return (
      <Fragment>
        {this.state.siteBanner}
        <SiteMain language={this.state.currentLanguage} />
      </Fragment>
    )
  }

}

export default App;
