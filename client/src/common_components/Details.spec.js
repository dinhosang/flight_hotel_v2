import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Details from './Details.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe('Details - common_components/Details.js', () => {

// Setting up variable for propless version of Details
  let noPropComponent

// Assigning shallow copy of propless version of Details
  beforeAll(() => {
    noPropComponent = shallow(<Details />);
  });


// Tests checking expected number of html elements
  test('should render 1 <details> tag', () => {
    // act - find number of <details> tags
    const numberOfDetailsTags = noPropComponent.find('details').length;
    // assert - number of <details> tags should be 1
    expect(numberOfDetailsTags).toEqual(1)
  });

  test('should render 1 <summary> tag', () => {
    // act - find number of <summary> tags
    const numberOfSummaryTags = noPropComponent.find('summary').length;
    // assert - number of <summary> tags should be 1
    expect(numberOfSummaryTags).toEqual(1)
  });

  test('should render 1 <span> tag', () => {
    // act - find number of <span> tags
    const numberOfSpanTags = noPropComponent.find('span').length;
    // assert - number of <span> tags should be 1
    expect(numberOfSpanTags).toEqual(1)
  });


// Tests checking elements are rendered with correct parent/child relationships
  test('should render <summary> within <details>', () => {
    // act - checking that route 'details summary' has rendered correctly
    const routeExists = noPropComponent.exists('details summary');
    // assert - verifying that above check for existance was succesful
    expect(routeExists).toBe(true)
  });

  test('should render <span> within <summary> within <details>', () => {
    // act - checking that route 'details summary span' has rendered correctly
    const routeExists = noPropComponent.exists('details summary span');
    // assert - verifying that above check for existance was succesful
    expect(routeExists).toBe(true)
  });


// Tests checking props are correctly assigned
  test('should assign prop ( open ) to the open attribute'
  + ' on the <details> with test name of details - result should display:'
  + ' "open"', () => {
    // arrange - set up props and components
    const open_prop = "open-3si3m";

    const component = shallow(<Details open={open_prop} />);
    const elementToTest_details = component;
    // act - make queries on component
    const open = elementToTest_details.prop('open');
    const typeCheck = elementToTest_details.type();
   // assert - confirm that details has open attribute with the expected value,
   // and is of type 'details'
    expect(open).toEqual(`${open_prop}`);
    expect(typeCheck).toEqual('details');
  });

  test('should assign prop ( id ) to the id attribute'
  + ' on the <details> with test name of details - result should display:'
  + ' "id"', () => {
    // arrange - set up props and components
    const id_prop = "id-yrut1";

    const component = shallow(<Details id={id_prop} />);
    const elementToTest_details = component;
    // act - make queries on component
    const id = elementToTest_details.prop('id');
    const typeCheck = elementToTest_details.type();
   // assert - confirm that details has id attribute with the expected value,
   // and is of type 'details'
    expect(id).toEqual(`${id_prop}`);
    expect(typeCheck).toEqual('details');
  });

  test('should assign prop ( span ) to the className attribute'
  + ' on the <details> with test name of details - result should display:'
  + ' "span"', () => {
    // arrange - set up props and components
    const span_prop = "span-slgjk";

    const component = shallow(<Details span={span_prop} />);
    const elementToTest_details = component;
    // act - make queries on component
    const className = elementToTest_details.prop('className');
    const typeCheck = elementToTest_details.type();
   // assert - confirm that details has className attribute with the expected value,
   // and is of type 'details'
    expect(className).toEqual(`${span_prop}`);
    expect(typeCheck).toEqual('details');
  });

  test('should assign prop ( handleClick ) to the attribute'
  + ' which handles an event of type: "click". This attribute will be on the <summary>'
  + ' with the test name of summary', () => {
    // arrange - set up callback variables and components
    let result = 5;
    const callback = () => result += 2;

    const component = shallow(<Details handleClick={callback} />);
    const elementToTest_summary = component.childAt(0);
    // act - simulate event to invoke callback,
    // and query that tested element is the expected type
    elementToTest_summary.simulate('click');
    const typeCheck = elementToTest_summary.type();
    // assert - confirm that result variable has a new value of '7'
    // and that element is of type 'summary'
    expect(result).toEqual(7);
    expect(typeCheck).toEqual('summary');
  });

    test('should assign prop ( summary ) with the result having'
    + ' the appearance of "${summary_prop}"', () => {
    // arrange - setup prop variable(s)
    const summary_prop = "summary-n4hlu";

    const component = shallow(<Details summary={summary_prop} />);
    const elementToTest_summaryDisplay = component.childAt(0).childAt(0);
    // act - find the location of the displayed value and
    // check that said value is equal to the expected value
    const result = elementToTest_summaryDisplay.equals(`${summary_prop}`);
    // assert - confirm that the above check resolves true
    expect(result).toBe(true);
  });

    test('should assign prop ( children ) with the result having'
    + ' the appearance of "${children_prop}"', () => {
    // arrange - setup prop variable(s)
    const children_prop = "children-6zxp2";

    const component = shallow(<Details children={children_prop} />);
    const elementToTest_children = component.childAt(1);
    // act - find the location of the displayed value and
    // check that said value is equal to the expected value
    const result = elementToTest_children.equals(`${children_prop}`);
    // assert - confirm that the above check resolves true
    expect(result).toBe(true);
  });

});
