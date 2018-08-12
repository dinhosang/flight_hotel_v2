import React from 'react';

const LanguageSelect = (props) => {
  const langs = props.supportedLangs;
  const languageConverterToOriginalLang = props.languageConverterToOriginalLang;
  const languageConverterToCurrentLang = props.languageConverterToCurrentLang;

  const options = langs.map((language) => {
    if(language !== props.currentLang) {
      return (
        <option value={language} key={props.idCreater()}>
          {`${languageConverterToOriginalLang[language]}`
          + ` (${languageConverterToCurrentLang[language]})`}
        </option>
      )
    } else {
      return (
        <option value={language} key={props.idCreater()}>
          {languageConverterToOriginalLang[language]}
        </option>
      )
    }
  })

  return (
    <select value={props.currentLang} onChange={props.handleChange}>
      {options}
    </select>
  )
};

export {LanguageSelect as default};
