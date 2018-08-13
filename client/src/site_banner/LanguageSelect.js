import React, { Component } from 'react';
import Details from '../common_components/Details.js';

class LanguageSelect extends Component {

  constructor(props) {
    super(props)
    this.state = {
      detailsOpen: false
    }
  }

  handleLanguageListOpenClick = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        detailsOpen: !prevState.detailsOpen
      }
    })
  }

  handleClickLocalWrapper = (language) => {
    this.props.handleClickAppWrapper(language)
    this.setState({
      detailsOpen: false
    })
  }

  createLanguagesList = () => {
    const langs = this.props.supportedLangs;
    const languageConverterToOriginalLang = this.props.languageConverterToOriginalLang;
    const languageConverterToCurrentLang = this.props.languageConverterToCurrentLang;
    const idCreater = this.props.idCreater;

    const listItems = langs.map((language) => {
      const handleClick = this.handleClickLocalWrapper.bind(this, language)
      if(language !== this.props.currentLang) {
        return (
          <li value={language} key={idCreater()} onClick={handleClick}>
            {`${languageConverterToOriginalLang[language]}`
            + ` (${languageConverterToCurrentLang[language]})`}
          </li>
        )
      } else {
        return (
          <li value={language} key={idCreater()}  onClick={handleClick}>
            {languageConverterToOriginalLang[language]}
          </li>
        )
      }
    });

    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  render() {

    return (
      <Details id="language-select"
        handleClick={this.handleLanguageListOpenClick}
        summary={this.props.currentLangWordForEnglishWordLanguage}>
        {this.createLanguagesList()}
      </Details>
    )
  }


}

export {LanguageSelect as default};
