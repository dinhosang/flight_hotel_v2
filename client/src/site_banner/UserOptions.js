import React, { Component } from 'react';
import Details from '../common_components/Details.js';

class UserOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleDetailsSummaryClick = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        open: !prevState.open
      }
    })
  }

  createList = (props) => {
    return [
      <li key="1">First</li>,
      <li key="2">Second</li>,
      <li key="3">Third</li>
    ]
  }


  render() {
    return (
      <Details id="user-options"
        open={this.state.open}
        handleClick={this.handleDetailsSummaryClick}
        summary={this.props.summary}>
        {this.createList()}
      </Details>
    )
  }

}

export {UserOptions as default};
