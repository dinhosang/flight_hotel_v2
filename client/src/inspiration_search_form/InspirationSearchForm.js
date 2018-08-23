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
      currencyList: this.setupCurrencies(),
      "origin-list": "",
      "depart-date": {
        string: "",
        dateObject: ""
      },
      "return-date": {
        string: "",
        dateObject: ""
      },
      "seat-class": "ECONOMY",
      "currency-select": "",
      "direct-flight-checkbox": false,
      "adult-tickets": 1,
      "children-tickets": 0,
      "infant-tickets": 0,
      required: [
        "origin-list",
        "depart-date",
        "return-date"
      ],
      failedSubmission: false
    };
  }

  // could be performed async with Promise.all for example
  // but not even computation required in any of the called
  // methods to require an async version, doing so may
  // even slow things down.
  handleSubmit = (event) => {
    event.preventDefault();

    // checks origin, depart, and return fields are not at default
    const requirementsPassed = this.checkRequiredFieldsFilled();
    if(!requirementsPassed) {
      this.handleFailedSubmission();
      return;
    }

    // checks origin value matches a value on one of the
    // datalist options.
    const validOrigin = this.checkValidOrigin();
    if(!validOrigin) {
      this.handleFailedSubmission();
      return;
    }

    // checks depart date is equal to or later than today's date
    const validDepartDate = this.checkDepartDateValid();
    if(!validDepartDate) {
      this.handleFailedSubmission();
      return;
    }

    // checks return date is 1-15 days from depart date
    const validReturnDate = this.checkReturnDateValid();
    if(!validReturnDate) {
      this.handleFailedSubmission();
      return;
    }
  }

  // TODO: 
  // rendering should check this value, determine what caused
  // the failure, and inform user in some way
  // perhaps settings a class to display a red border?
  // and perhaps assign text as final span to lis containing
  // invalid input?
  handleFailedSubmission = () => {
    this.setState({
      failedSubmission: true
    });
  }

  checkReturnDateValid = () => {
    let validReturnDate = false;

    const inputReturnDate = this.state["return-date"].dateObject;
    const inputDepartDate = this.state["depart-date"].dateObject;

    // finds the difference in milliseconds
    const differenceMs = inputReturnDate - inputDepartDate;
    // creates an object with a date based on the milliseconds
    // after 01/01/1970
    const differenceDateObject = new Date(differenceMs);
    /*
    * grabs date value which will be the number of days between
    * the input depart and return dates.
    * starts at a baseline of a full day, so need to remove 1
    * from differenceDays to achieve an accurant value

    * For instance 2018/02/20 - 2018/02/20 entered into
    * a new date object would return a day below of 1, rather
    * than 0, as long as the times in ms are not exactly the same.
    */
    const differenceDays = differenceDateObject.getDate() - 1;
    // amadeus API only accepts durations between 1 and 15
    // inclusive. No returning the same day, or 16 days later.
    if(differenceDays >= 1 && differenceDays <= 15) {
      validReturnDate = true;
    }
    return validReturnDate;
  }

  checkDepartDateValid = () => {
    let validDepartDate = false;

    // creating date object using local time
    const localDate = new Date();

    // setting to earliest point possible in said date
    localDate.setHours(0);
    localDate.setMinutes(0);
    localDate.setSeconds(0);
    localDate.setMilliseconds(0);

    // Date below will have been set to earliest possible time
    // at date string. Hence the need to set hours etc for
    // localDate above as otherwise the
    // if statement below may fail, even if the calendar dates
    // are the same, due to a discrepancy in time values.

    // Date below was created as part of handleInputChange
    // for fields of type 'date'.
    const inputDepartDate = this.state["depart-date"].dateObject;

    // checking local date in milliseconds since 01/01/1970
    // to the inputDepartDate in milliseconds since 01/01/1970
    if(localDate.getTime() <= inputDepartDate.getTime()) {
      // is users local date is equal to or earlier than
      // the input depart date then it is treated as valid
      validDepartDate = true;
    }
    return validDepartDate;
  }

  checkValidOrigin = () => {
    let validOrigin = false;
    this.state.originOptions.forEach( option => {
      if(this.state["origin-list"] === option.props.value) {
        validOrigin = true;
      }
    });
    return validOrigin;
  }

  checkRequiredFieldsFilled = () => {
    let requirementsPassed = true;
    this.state.required.forEach( req => {
      if (this.state[req] === "") {
        requirementsPassed = false
      }
    })
    return requirementsPassed;
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
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if(target.type === 'date') {
      this.setState({
        [target.name]: {
          string: value,
          dateObject: new Date(value)
        }
      });
    } else {
      this.setState({
        [target.name]: value
      })
    }
  }

  render() {
    const strings = siteStrings[this.props.language]

    return (
      <form action="/api/search" method="get" className="search-form" target="_self"
      onSubmit={this.handleSubmit}>
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
              value={this.state["depart-date"].string}
              handleChange={this.handleInputChange}
              labelString={strings.departDate} />
            <SpanInputDate
              classesString="col-span-5 insp-list-text-field"
              id="inspiration-return-date-span"
              fieldId="return-date"
              value={this.state["return-date"].string}
              handleChange={this.handleInputChange}
              labelString={strings.returnDate} />
          </li>
          <li>
            <SpanInputSelect
              classesString="col-span-5 insp-list-text-field"
              id="seat-class-span"
              fieldId="seat-class"
              value={this.state["seat-class"]}
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
