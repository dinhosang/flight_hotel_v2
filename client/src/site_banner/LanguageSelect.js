import React from 'react';
import DetailsStateful from '../common_components/DetailsStateful.js';


const LanguageSelect = (props) => {

  const createList = function(id, handleClickWrapper){
    const langs = props.supportedLangs;
    const languageConverterToOriginalLang = props.languageConverterToOriginalLang;
    const languageConverterToCurrentLang = props.languageConverterToCurrentLang;
    const keyCreater = props.keyCreater;

    const listItems = langs.map((language) => {
      const handleClick = handleClickWrapper.bind(this, language)
      if(language !== props.currentLang) {
        return (
          <li key={keyCreater()} tabIndex="0" onClick={handleClick} onKeyUp={handleClick}>
            <a>
              {`${languageConverterToOriginalLang[language]}`
              + ` (${languageConverterToCurrentLang[language]})`}
            </a>
          </li>
        )
      } else {
        return (
          <li key={keyCreater()} tabIndex="0" onClick={handleClick} onKeyUp={handleClick}>
            <a>
              {languageConverterToOriginalLang[language]}
            </a>
          </li>
        )
      }
    });

    return (
      <ul id={id}>
        {listItems}
      </ul>
    );
  }

  return (
    <DetailsStateful id="language-select"
        listId="language-select-list"
        createList={createList}
        handleClick={props.handleClick}
        summary={props.summary}
        span={props.span} />
  )
}

export {LanguageSelect as default};
