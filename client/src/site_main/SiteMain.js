import React, { Component } from 'react';

import InspForm from '../inspiration_search_form/InspirationSearchForm.js';

class SiteMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: "INSPIRATION_FORM"
    };
  }

  handleInspirationSearch = (details) => {
    // const searchFormValues = details.values;
    // const inspirationSearchData = details.data;
    console.log(details);
  }

  render() {
    let view;
    switch (this.state.currentView) {
      case "INSPIRATION_FORM":
        view = (
          <InspForm handleSearch={this.handleInspirationSearch} language={this.props.language} />
        );
        break;
      default:
        view = (
          <InspForm language={this.props.language} />
        );
    }
    return (
      <main id="site-main">
        {view}
      </main>
    )
  }


}

export {SiteMain as default};
