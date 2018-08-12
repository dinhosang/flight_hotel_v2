import React, { Component } from 'react';

class SiteBanner extends Component {

  this.state = {
    displayNav: false,
    language: "english"
  }

  const siteStrings = {
    languages: ['english']
    english: {
      searchTitle: "Search Type",
      inspiration: "Inspiration",
      destination: "Destination"
    }
  }

  const NavLink = (props) => {
    return (
      <li>
        <a href={`${props.url}/${props.path}`} onClick={props.handleClick} value={props.value}>{props.displayValue}</a>
      </li>
    );
  }

  const SiteNav = (props) => {

    const FinalNav = (
      <nav id="site-banner-nav">
        <ul>
          {props.navItems}
        </ul>
      </nav>
    );

    if(!props.display) {
      return <FinalNav className="hidden" />;
    }
    return <FinalNav />;
  }

  render() {
    // grabs protocol and domain from browser, not including paths
    const url = document.location.origin;

    const searchTitle = <li>{siteStrings[language].searchTitle}</li>;

    const inspirationLink = (
      <NavLink url={url} path="inspiration-search" onClick={this.handleClick} value={siteStrings.english.inspiration} displayValue={siteStrings[language].inspiration} />
    );

    const destinationLink = (
      <NavLink url={url} path="destination-search" onClick={this.handleClick} value={siteStrings.english.destination} displayValue={siteStrings[language].destination} />
    );

    const navItems = [searchTitle, inspirationLink, destinationLink];

    return (
      <SiteNav navItems={navItems} display={this.state.displayNav}/>
    );
  }
}

export {SiteNav as default};
