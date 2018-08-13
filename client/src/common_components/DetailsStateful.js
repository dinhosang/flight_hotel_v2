import React, { Component } from 'react';
import Details from '../common_components/Details.js';

class DetailsStateful extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  // adds an eventListener when users open up the language-select-list
  // and removes it whenever it closes, including when the callback of
  // the eventListener is called. Or when the props are updated due
  // to a language having been selected.
  componentDidUpdate() {
    if(this.state.open){
      document.addEventListener('click', this.handleDocumentClick, {once: true})
    } else {
      document.removeEventListener('click', this.handleDocumentClick, {once: true})
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

  handleClickLocalWrapper = (value) => {
    this.setState({
      open: false
    })
    this.props.handleClick(value)
  }

  handleDocumentClick = (event) => {
    const languageSelect = document.getElementById(this.props.id);
    const list = document.getElementById(this.props.listId);

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
    const createList = this.props.createList.bind(this);
    return (
      <Details id={this.props.id}
        open={this.state.open}
        handleClick={this.handleDetailsSummaryClick}
        summary={this.props.summary}>
        {createList(this.props.listId, this.handleClickLocalWrapper)}
      </Details>
    )
  }

}

export {DetailsStateful as default};
