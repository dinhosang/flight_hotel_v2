import React, { Component } from 'react';
import nanoid from 'nanoid';

import SpanInputDatalist from './SpanInputDatalist.js';
import SpanInputDate from './SpanInputDate.js';
import SpanInputSelect from './SpanInputSelect.js';
import SpanInputCheckbox from './SpanInputCheckbox.js';
import TicketChoice from './FieldsetTicketChoice.js';
import SpanButton from './SpanButton.js';

import siteStrings from '../resources/site_strings.js';
import originIatas from '../resources/inspiration_origins_iata.js';
import cityDetails from '../resources/city_details.js';
import acceptedCurrencies from '../resources/amadeus_accepted_currencies.js';

class InspirationSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      originOptions: this.setupOrigins(),
      currencyList: this.setupCurrencies()
    };
  }

  setupOrigins = () => {
    const originOptions = [];

    originIatas.forEach( origin => {
      const city = cityDetails.DETAILS_BY_IATA[origin];
      const label = `${city.nameCity}, ${city.codeIso2Country}`;
      originOptions.push(
        <option value={origin}
          label={label} key={nanoid()} />
      );
    })

    return originOptions;
  }

  setupCurrencies = () => {
    const currencies = [];
    const listOfCurrKeys = Object.keys(acceptedCurrencies);

    listOfCurrKeys.forEach((currCode, index) => {
      // separates the main three currencies from the rest
      // in the datalist.
      if(index === 3){
        currencies.push(
          <option value=" " key={nanoid()} />
        );
      }

      const symbol = acceptedCurrencies[currCode].symbol;
      currencies.push(
        <option value={currCode} key={nanoid()}>
          {symbol}
        </option>
      );
    })

    return currencies;
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({
      [target.name]: value
    })
  }

  render() {
    const strings = siteStrings[this.props.language]

    return (
      <form action="/api/search" method="get" className="search-form" target="_self">
        <header>
          {strings.inspFormHeader}
        </header>
        <ul>
          <li>
            <SpanInputDatalist
              classesString="col-span-5 insp-list-text-field"
              id="inspiration-origin-span"
              fieldId="origin-list"
              labelString={strings.originInput}
              handleChange={this.handleInputChange}
              value={this.state["origin-list"]}
              datalistId="origins"
              options={this.state.originOptions} />
          </li>
          <li>
            <SpanInputDate
              classesString="col-span-5 insp-list-text-field"
              id="inspiration-depart-date-span"
              fieldId="depart-date"
              value={this.state["depart-date"]}
              handleChange={this.handleInputChange}
              labelString={strings.departDate} />
            <SpanInputDate
              classesString="col-span-5 insp-list-text-field"
              id="inspiration-return-date-span"
              fieldId="return-date"
              value={this.state["return-date"]}
              handleChange={this.handleInputChange}
              labelString={strings.returnDate} />
          </li>
          <li>
            <SpanInputSelect
              classesString="col-span-5 insp-list-text-field"
              id="seat-class-span"
              fieldId="seat-class"
              value={this.state["seat-class"] || "ECONOMY"}
              handleChange={this.handleInputChange}
              labelString={strings.seatClass.label}>
                <option value="ECONOMY">
                  {strings.seatClass.economy}
                </option>
                <option value="PREMIUM_ECONOMY">
                  {strings.seatClass.premiumEconomy}
                </option>
                <option value="BUSINESS">
                  {strings.seatClass.business}
                </option>
                <option value="FIRST">
                  {strings.seatClass.first}
                </option>
            </SpanInputSelect>
            <SpanInputDatalist
              classesString="col-span-5 insp-list-text-field"
              id="currency-select-span"
              fieldId="currency-select"
              labelString={strings.currencySelectLabel}
              handleChange={this.handleInputChange}
              value={this.state["currency-select"]}
              datalistId="currency-datalist"
              options={this.state.currencyList} />
            <SpanInputCheckbox
              classesString="col-span-5"
              id="direct-flight-checkbox-span"
              fieldId="direct-flight-checkbox"
              isChecked={this.state["direct-flight-checkbox"]}
              handleChange={this.handleInputChange}
              labelString={strings.directCheckboxLabel} />
          </li>
          <li>
            <TicketChoice
              classesString="col-span-5"
              language={this.props.language}
              handleChange={this.handleInputChange}
              adultTicketsValue={this.state["adult-tickets"]}
              childrenTicketsValue={this.state["children-tickets"]}
              infantTicketsValue={this.state["infant-tickets"]} />
            <SpanButton classesString="col-span-5"
              id="submit-insp-form-span"
              buttonId="submit-insp-form"
              buttonClassesString="form-button"
              buttonText={strings.submit} />
          </li>
        </ul>
      </form>
    )
  }


}

export {InspirationSearchForm as default};
