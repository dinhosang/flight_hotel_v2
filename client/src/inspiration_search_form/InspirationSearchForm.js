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
        value: "",
        dateObject: ""
      },
      "return-date": {
        value: "",
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
      attemptedSubmission: {
        failed: false,
        requiredFieldsAreEmpty: {
          "origin-list": false,
          "depart-date": false,
          "return-date": false
        },
        checkedFieldValuesInvalid: {
          "origin-list": {
            invalid: false,
            reason: null
          },
          "depart-date": {
            invalid: false,
            reason: null
          },
          "return-date": {
            invalid: false,
            reason: null
          },
          "currency-select": {
            invalid: false,
            reason: null
          }
        }
      },
      strings: siteStrings[this.props.language].inspirationSearch
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

      /*
      * tried below but found usability issue where is the
      * empty option is selected then other options cannot be
      * seen as the list does not contain any currencies that
      * begin with a whitespace character.
      * Using disabled attribute just removes it from view
      * Adding a <br> instead doesn't work.
      * Can perhaps add a special class to the third of the
      * main targeted currencies and give that a special bottom
      * border?
      */
      // separates the main three currencies from the rest
      // in the datalist.
      // if(index === 3){
      //   currencies.push(
      //     <option value=" " key={nanoid()} />
      //   );
      // }

      const symbol = acceptedCurrencies[currCode].symbol;
      let option;
      if(index !== 2){
        option = (
          <option value={currCode} key={nanoid()}>
            {symbol}
          </option>
        )
      } else {
        option = (
          <option value={currCode} id="end-main-currencies" key={nanoid()}>
            {symbol}
          </option>
        )
      }
      currencies.push(option);
    })

    return currencies;
  }


  // could be performed async with Promise.all for example
  // but not even computation required in any of the called
  // methods to require an async version, doing so may
  // even slow things down.
  handleSubmit = (event) => {
    event.preventDefault();

    // checks origin, depart, and return fields are not at default
    // matches default state for attemptedSubmission key's upper half
    const fieldChecksJSON = JSON.stringify(this.state.attemptedSubmission);
    const fieldChecks = JSON.parse(fieldChecksJSON);

    // set a baseline by clearing any previous errors
    fieldChecks.failed = false;
    fieldChecks.requiredFieldsAreEmpty = {
      "origin-list": false,
      "depart-date": false,
      "return-date": false
    }
    // check if any required fields have been left empty
    this.checkRequiredFieldsFilled(fieldChecks);
    // check if there are any outstanding invalid inputs
    // and setting fieldChecks.failed back to true if so.
    this.checkStatusValidInAllReqFields(fieldChecks);
    if(fieldChecks.failed){
      this.handleFailedSubmission(fieldChecks);
      return;
    }

    console.log('success');
  }

  checkStatusValidInAllReqFields = (fieldChecks) => {
    const fields = fieldChecks.checkedFieldValuesInvalid;
    const fieldKeys = Object.keys(fields);
    fieldKeys.forEach(field => {
      if(fields[field].invalid === true) {
        fieldChecks.failed = true;
      }
    })
  }

  // TODO:
  // rendering should check this value and inform user in some way
  // perhaps settings a class to display a red border?
  // and perhaps assign text as final span to lis containing
  // invalid input?
  handleFailedSubmission = (results) => {
    this.setState({
      attemptedSubmission: results
    });
  }

  checkRequiredFieldsFilled = (fieldChecks) => {
    this.state.required.forEach( field => {
      // first check is for origin-list, second is for depart/return dates
      // which are stored in a different structure to the origin in the state.
      if (this.state[field] === "" || this.state[field].value === "") {
        fieldChecks.failed = true;
        fieldChecks.requiredFieldsAreEmpty[field] = true;
      }
    });
  }


  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value;

    switch (target.type) {
      case "date":
        this.setState({
          [target.name]: {
            value: value,
            dateObject: new Date(value)
          }
        });
        break;
      default:
        this.setState({
          [target.name]: value
        })
    }
  }

  // handles when required fields lose focus
  // checks they have valid input
  handleInputBlur = (event) => {
    const name = event.target.name;
    let defaultStartingValue = true;
    // copy state object into a new object with a new reference
    const fieldChecksJSON = JSON.stringify(this.state.attemptedSubmission);
    const fieldChecks = JSON.parse(fieldChecksJSON);

    switch (name) {
      case "origin-list":
        // these and future if statements are to protect
        // against user just tabbing past empty fields
        // firing off methods that expect non-empty values
        if(this.state["origin-list"] !== "") {
          this.checkOriginValid(fieldChecks);
          defaultStartingValue = false;
        }
        break;
      case "depart-date":
        if(this.state["depart-date"].value !== "") {
          this.checkDepartDateValid(fieldChecks);
          defaultStartingValue = false;
        }
        break;
      case "return-date":
        if(this.state["return-date"].value !== "") {
          this.checkReturnDateValid(fieldChecks);
          defaultStartingValue = false;
        }
        break;
      case "currency-select":
        if(this.state["currency-select"] !== "") {
          this.checkCurrencyValid(fieldChecks)
          defaultStartingValue = false;
        }
        break;
      default:
        return;
    };

    // below sets value of fieldChecks.failed to true
    // if there were invalid values on other keys as well
    // as the one which just lost focus.
    if(!fieldChecks.failed){
      this.checkStatusValidInAllReqFields(fieldChecks);
    }

    // if user wasn't just tabbing past empty fields
    // then call setState with any new values
    if(!defaultStartingValue){
      this.setState({
        attemptedSubmission: fieldChecks
      });
    }
  }


  checkCurrencyValid = (fieldChecks) => {
    // setting default to it has failed
    fieldChecks.failed = true;

    const reasons = this.state.strings.formSubmissionErrors["currency-select"]
    const field = fieldChecks.checkedFieldValuesInvalid["currency-select"]
    field.invalid = true;
    field.reason = reasons.invalid;

    // looking for one correct value, if found will set fail status
    // to false.
    this.state.currencyList.forEach(option => {
      if(this.state["currency-select"] === option.props.value) {
        fieldChecks.failed = false;
        field.invalid = false;
        field.reason = null;
      }
    });
  }

  checkOriginValid = (fieldChecks) => {
    // setting default to it has failed
    fieldChecks.failed = true;

    const reasons = this.state.strings.formSubmissionErrors["origin-list"]
    const field = fieldChecks.checkedFieldValuesInvalid["origin-list"]
    field.invalid = true;
    field.reason = reasons.invalid;

    // looking for one correct value, if found will set fail status
    // to false.
    this.state.originOptions.forEach(option => {
      if(this.state["origin-list"] === option.props.value) {
        fieldChecks.failed = false;
        field.invalid = false;
        field.reason = null;
      }
    });
  }

  checkDepartDateValid = (fieldChecks) => {
    // creating date object using local time
    const localDate = new Date();
    const reasons = this.state.strings.formSubmissionErrors["depart-date"];
    const field = fieldChecks.checkedFieldValuesInvalid["depart-date"];

    // setting a baseline by returning to default values
    fieldChecks.failed = false;
    field.invalid = false;
    field.reason = null;

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
    if(localDate.getTime() > inputDepartDate.getTime()) {
      // if users zero-houred local date is greater than
      // the input depart date, then the depart date
      // is treated as invalid
      fieldChecks.failed = true;
      field.invalid = true;
      field.reason = reasons.passed;
    }
  }

  checkReturnDateValid = (fieldChecks) => {
    const reasons = this.state.strings.formSubmissionErrors["return-date"]
    const field = fieldChecks.checkedFieldValuesInvalid["return-date"]

    // setting a baseline by returning to default values
    fieldChecks.failed = false;
    field.invalid = false;
    field.reason = null;

    const inputReturnDate = this.state["return-date"].dateObject;
    const inputDepartDate = this.state["depart-date"].dateObject;

    // finds the difference in milliseconds
    const differenceMs = inputReturnDate - inputDepartDate;
    if(differenceMs < 0) {
      fieldChecks.failed = true;
      field.invalid = true;
      field.reason = reasons.tooEarly;
      return;
    }
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
    if(differenceDays < 1 || differenceDays > 15) {
      fieldChecks.failed = true;
      field.invalid = true;
      field.reason = differenceDays < 1 ? reasons.tooEarly : reasons.tooFar
    }
  }


  render() {
    const strings = siteStrings[this.props.language].inspirationSearch

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
              handleBlur={this.handleInputBlur}
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
              handleBlur={this.handleInputBlur}
              labelString={strings.departDate} />
            <SpanInputDate
              classesString="col-span-5 insp-list-text-field"
              id="inspiration-return-date-span"
              fieldId="return-date"
              value={this.state["return-date"].string}
              handleChange={this.handleInputChange}
              handleBlur={this.handleInputBlur}
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
              handleBlur={this.handleInputBlur}
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
              buttonText={siteStrings[this.props.language].submit} />
          </li>
        </ul>
      </form>
    )
  }


}

export {InspirationSearchForm as default};
