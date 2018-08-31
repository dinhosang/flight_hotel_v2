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


// Tests checking non-other element types are rendered with correct parent/child relationships
  test('should render <summary> within <details>', () => {
    // act - checking that route 'details summary' has rendered correctly (test is ignoring 'other' type elements)
    const routeExists = noPropComponent.exists('details summary');
    // arrange - setting up variables for each element in route.

    // the childAt(index) index may not be exact index as per
    // the component js file. This will be because an earlier sibling
    // was of type other, which will not appear in a noPropComponent
    // As such the index used may be a lower number than expected
    // due to the indexes that included an other element being ignored
    const summary_routeIndex_1 = noPropComponent.childAt(0);
    // assert - verifying that above check for existance was succesful
    expect(routeExists).toBe(true)
    expect(noPropComponent.type()).toEqual('details');
    expect(summary_routeIndex_1.type()).toEqual('summary');
  });

  test('should render <span> within <summary> within <details>', () => {
    // act - checking that route 'details summary span' has rendered correctly (test is ignoring 'other' type elements)
    const routeExists = noPropComponent.exists('details summary span');
    // arrange - setting up variables for each element in route.

    // the childAt(index) index may not be exact index as per
    // the component js file. This will be because an earlier sibling
    // was of type other, which will not appear in a noPropComponent
    // As such the index used may be a lower number than expected
    // due to the indexes that included an other element being ignored
    const summary_routeIndex_1 = noPropComponent.childAt(0);
    const span_routeIndex_2 = summary_routeIndex_1.childAt(0);
    // assert - verifying that above check for existance was succesful
    expect(routeExists).toBe(true)
    expect(noPropComponent.type()).toEqual('details');
    expect(summary_routeIndex_1.type()).toEqual('summary');
    expect(span_routeIndex_2.type()).toEqual('span');
  });


// Tests checking props are correctly assigned
  test('should assign prop ( open ) to the open attribute'
  + ' on the <details> with test name of details - result should display:'
  + ' "open"', () => {
    // arrange - set up props and components
    const open_prop = "open-388hb";

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
    const id_prop = "id-1w22e";

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
    const span_prop = "span-y1i0y";

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
    const summary_prop = "summary-4t0h9";

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
    const children_prop = "children-nw4er";

    const component = shallow(<Details children={children_prop} />);
    const elementToTest_children = component.childAt(1);
    // act - find the location of the displayed value and
    // check that said value is equal to the expected value
    const result = elementToTest_children.equals(`${children_prop}`);
    // assert - confirm that the above check resolves true
    expect(result).toBe(true);
  });

});
