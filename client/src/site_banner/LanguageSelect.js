import React, { Component } from 'react';
import Details from '../common_components/Details.js';

class LanguageSelect extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleDetailsSummaryClick = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        open: !prevState.open
      }
    })
  }

  handleClickLocalWrapper = (language) => {
    this.props.handleClickAppWrapper(language)
    this.setState({
      open: false
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
        open={this.state.open}
        handleClick={this.handleDetailsSummaryClick}
        summary={this.props.summary}>
        {this.createLanguagesList()}
      </Details>
    )
  }


}

export {LanguageSelect as default};
