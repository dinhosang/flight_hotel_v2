import React from 'react';

import SpanInputSelect from './SpanInputSelect.js';

import siteStrings from '../resources/site_strings.js';

const FieldsetTicketChoice = (props) => {
  const strings = siteStrings[props.language]
  return (
    <fieldset className={props.classesString}>
      <legend>
        {strings.ticketsDesired.label}
      </legend>
      <SpanInputSelect
        id="adult-tickets-span"
        fieldId="adult-tickets"
        value={props.adultTicketsValue || "1"}
        handleChange={props.handleChange}
        labelString={strings.ticketsDesired.adult}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
      </SpanInputSelect>
      <SpanInputSelect
        id="children-tickets-span"
        fieldId="children-tickets"
        value={props.childrenTicketsValue || "0"}
        handleChange={props.handleChange}
        labelString={strings.ticketsDesired.children}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
      </SpanInputSelect>
      <SpanInputSelect
        id="infant-tickets-span"
        fieldId="infant-tickets"
        value={props["infant-tickets"] || "0"}
        handleChange={props.handleChange}
        labelString={strings.ticketsDesired.infant}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
      </SpanInputSelect>
    </fieldset>
  );
}

export {FieldsetTicketChoice as default};
