import React, { Component } from 'react';

import siteStrings from '../resources/site_strings.js';
import originIatas from '../resources/inspiration_origins_iata.js';
import cityDetails from '../resources/city_details.js';

class SiteMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      originOptions: this.setupOrigins()
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

  render() {
    const lang = this.props.language;
    return (
      <main id="site-main">
        <form action="/api/search" method="get" className="search-form" target="_self">
          <header>
            {siteStrings[lang].inspFormLegend}
          </header>
          <ul>
            <li>
              <span className="col-span-4" id="inspiration-origin-span">
                <label for="origin-list">
                  {siteStrings[lang].originInput}
                </label>
                <input list="origins" id="origin-list" name="origin-list" />
                <datalist id="origins">
                  {this.state.originOptions}
                </datalist>
              </span>
            </li>
            <li>
              <span className="col-span-4" id="inspiration-depart-date-span">
                <label for="depart-date">
                  {siteStrings[lang].departDate}
                </label>
                <input id="depart-date" type="date" />
              </span>
              <span className="col-span-4" id="inspiration-return-date-span">
                <label for="return-date">
                  {siteStrings[lang].returnDate}
                </label>
                <input id="return-date" type="date" />
              </span>
            </li>
          </ul>
        </form>
      </main>
    )
  }


}

export {SiteMain as default};
