import React, { Component } from 'react';
import Details from '../common_components/Details.js';

class UserOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidUpdate() {
    if(this.state.open){
      document.addEventListener('click', this.handleDocumentClick)
    } else {
      document.removeEventListener('click', this.handleDocumentClick)
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
    return (
      <ul id="user-options-list">
        <li key="1">First</li>
        <li key="2">Second</li>
        <li key="3">Third</li>
      </ul>
    );
  }

  handleDocumentClick = (event) => {
    const languageSelect = document.getElementById('user-options');
    const list = document.getElementById('user-options-list');

    const childNodes = []
    languageSelect.childNodes.forEach(node => {
      childNodes.push(node);
    })
    list.childNodes.forEach(node => {
      childNodes.push(node);
    })

    // obvious issue is if another element ever has the same innerHTML
    const target = event.target.innerHTML;
    let targetWithinComponent;

    if(childNodes.includes(event.target)){
      targetWithinComponent = true;
    }
    childNodes.forEach(node => {
      if(target === node.innerHTML){
        targetWithinComponent = true;
      }
    })

    // If user clicks outside the LanguageSelect while it is set to open
    // then it will close it back down.
    if(!targetWithinComponent) {
      this.setState({
        open: false
      })
    }
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
