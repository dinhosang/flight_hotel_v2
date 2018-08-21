import React, { Component } from 'react';

import siteStrings from '../resources/site_strings.js';
import originIatas from '../resources/inspiration_origins_iata.js';
import cityDetails from '../resources/city_details.js';
import acceptedCurrencies from '../resources/amadeus_accepted_currencies.js';

class SiteMain extends Component {

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
        <option value={origin} label={label}></option>
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
        currencies.push(<option value=" "/>);
      }

      const symbol = acceptedCurrencies[currCode].symbol;
      currencies.push(
        <option value={currCode}>{symbol}</option>
      );
    })

    return currencies;
  }

  render() {
    const strings = siteStrings[this.props.language]
    return (
      <main id="site-main">
        <form action="/api/search" method="get" className="search-form" target="_self">
          <header>
            {strings.inspFormHeader}
          </header>
          <ul>
            <li>
              <span className="col-span-5 insp-list-text-field" id="inspiration-origin-span">
                <label for="origin-list">
                  {strings.originInput}
                </label>
                <input list="origins" id="origin-list" name="origin-list" />
                <datalist id="origins">
                  {this.state.originOptions}
                </datalist>
              </span>
            </li>
            <li>
              <span className="col-span-5 insp-list-text-field" id="inspiration-depart-date-span">
                <label for="depart-date">
                  {strings.departDate}
                </label>
                <input id="depart-date" type="date" />
              </span>
              <span className="col-span-5 insp-list-text-field" id="inspiration-return-date-span">
                <label for="return-date">
                  {strings.returnDate}
                </label>
                <input id="return-date" type="date" />
              </span>
            </li>
            <li>
              <span className="col-span-5 insp-list-text-field" id="seat-class-span">
                <label for="seat-class">
                  {strings.seatClass.label}
                </label>
                <select id="seat-class">
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
                </select>
              </span>
              <span className="col-span-5 insp-list-text-field" id="currency-select-span">
                <label for="currency-select">
                  {strings.currencySelectLabel}
                </label>
                <input list="currency-list" id="currency-select" name="currency-select"/>
                <datalist id="currency-list">
                  {this.state.currencyList}
                </datalist>
              </span>
              <span className="col-span-5" id="direct-flight-checkbox-span">
                <label for="direct-flight-checkbox">
                  {strings.directCheckboxLabel}
                </label>
                <input type="checkbox" id="direct-flight-checkbox" />
              </span>
            </li>
            <li>
              <fieldset className="col-span-5">
                <legend>
                  {strings.ticketsDesired.label}
                </legend>
                <label for="adult-tickets">
                  {strings.ticketsDesired.adult}
                </label>
                <select id="adult-tickets" value="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <label for="children-tickets">
                  {strings.ticketsDesired.children}
                </label>
                <select id="children-tickets" value="0">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <label for="infant-tickets">
                  {strings.ticketsDesired.infant}
                </label>
                <select id="infant-tickets" value="0">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </fieldset>
              <span className="col-span-5">
                <button type="button" id="submit-insp-form" className="form-button">
                  {strings.submit}
                </button>
              </span>
            </li>
          </ul>
        </form>
      </main>
    )
  }


}

export {SiteMain as default};
