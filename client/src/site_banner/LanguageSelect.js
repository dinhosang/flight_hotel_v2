import React, { Component } from 'react';
import Details from '../common_components/Details.js';

// this and UserOptions share so many similarities, and differences
// like the implementation of createList could be passed as a prop
// but to do so would require the creation os a stateful generic component
// which these two would be composed of, but they would then themselves
// lack state, making the state hidden depper from the app.js than it already
// is. Not sure how to feel about that. Perhaps this would be fixed with redux?
// could place generic stateful component in this site_banner folder though
// at least until another part of the site turns out to need this somehow.
class LanguageSelect extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  // adds an eventListener when users open up the language-select-list
  // and removes it whenever it closes, including when the callback of
  // the eventListener is called. Or when the props are updated due
  // to a language having been selected.
  componentDidUpdate() {
    if(this.state.open){
      document.addEventListener('click', this.handleDocumentClick, {once: true})
    } else {
      document.removeEventListener('click', this.handleDocumentClick, {once: true})
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
    this.setState({
      open: false
    })
    this.props.handleClick(language)
  }

  handleDocumentClick = (event) => {
    const languageSelect = document.getElementById('language-select');
    const list = document.getElementById('language-select-list');

    const childNodes = []
    languageSelect.childNodes.forEach(node => {
      childNodes.push(node);
    })
    list.childNodes.forEach(node => {
      childNodes.push(node);
    })

    // obvious issue is if another element ever has the same innerHTML
    const target = event.target.innerHTML;
    let targetWithinComponent;

    if(childNodes.includes(event.target)){
      targetWithinComponent = true;
    }
    childNodes.forEach(node => {
      if(target === node.innerHTML){
        targetWithinComponent = true;
      }
    })

    // If user clicks outside the LanguageSelect while it is set to open
    // then it will close it back down.
    if(!targetWithinComponent) {
      this.setState({
        open: false
      })
    }
  }



  createList = () => {
    const langs = this.props.supportedLangs;
    const languageConverterToOriginalLang = this.props.languageConverterToOriginalLang;
    const languageConverterToCurrentLang = this.props.languageConverterToCurrentLang;
    const idCreater = this.props.idCreater;

    const listItems = langs.map((language) => {
      const handleClick = this.handleClickLocalWrapper.bind(this, language)
      if(language !== this.props.currentLang) {
        return (
          <li key={idCreater()} onClick={handleClick}>
            {`${languageConverterToOriginalLang[language]}`
            + ` (${languageConverterToCurrentLang[language]})`}
          </li>
        )
      } else {
        return (
          <li key={idCreater()}  onClick={handleClick}>
            {languageConverterToOriginalLang[language]}
          </li>
        )
      }
    });

    return (
      <ul id="language-select-list">
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
        {this.createList()}
      </Details>
    )
  }


}

export {LanguageSelect as default};
