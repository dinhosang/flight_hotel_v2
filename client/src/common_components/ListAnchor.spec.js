import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListAnchor from './ListAnchor.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe('ListAnchor - common_components/ListAnchor.js', () => {

// Setting up variable for propless version of ListAnchor
  let noPropComponent

// Assigning shallow copy of propless version of ListAnchor
  beforeAll(() => {
    noPropComponent = shallow(<ListAnchor />);
  });


// Tests checking expected number of html elements
  test('should render 1 <li> tag', () => {
    // act - find number of <li> tags
    const numberOfLiTags = noPropComponent.find('li').length;
    // assert - number of <li> tags should be 1
    expect(numberOfLiTags).toEqual(1)
  });

  test('should render 1 <a> tag', () => {
    // act - find number of <a> tags
    const numberOfATags = noPropComponent.find('a').length;
    // assert - number of <a> tags should be 1
    expect(numberOfATags).toEqual(1)
  });


// Tests checking non-other element types are rendered with correct parent/child relationships
  test('should render <a> within <li>', () => {
    // act - checking that route 'li a' has rendered correctly (test is ignoring 'other' type elements)
    const routeExists = noPropComponent.exists('li a');
    // arrange - setting up variables for each element in route.

    // the childAt(index) index may not be exact index as per
    // the component js file. This will be because an earlier sibling
    // was of type other, which will not appear in a noPropComponent
    // As such the index used may be a lower number than expected
    // due to the indexes that included an other element being ignored
    const a_routeIndex_1 = noPropComponent.childAt(0);
    // assert - verifying that above check for existance was succesful
    expect(routeExists).toBe(true)
    expect(noPropComponent.type()).toEqual('li');
    expect(a_routeIndex_1.type()).toEqual('a');
  });


// Tests checking props are correctly assigned
  test('should assign props ( url, and path ) to the href attribute'
  + ' on the <a> with test name of anchor - result should display:'
  + ' "url/path"', () => {
    // arrange - set up props and components
    const url_prop = "url-a9jvz";
    const path_prop = "path-dzuhg";

    const component = shallow(<ListAnchor url={url_prop} path={path_prop} />);
    const elementToTest_anchor = component.childAt(0);
    // act - make queries on component
    const href = elementToTest_anchor.prop('href');
    const typeCheck = elementToTest_anchor.type();
   // assert - confirm that anchor has href attribute with the expected value,
   // and is of type 'a'
    expect(href).toEqual(`${url_prop}/${path_prop}`);
    expect(typeCheck).toEqual('a');
  });

  test('should assign prop ( handleClick ) to the attribute'
  + ' which handles an event of type: "click". This attribute will be on the <a>'
  + ' with the test name of anchor', () => {
    // arrange - set up callback variables and components
    let result = 5;
    const callback = () => result += 2;

    const component = shallow(<ListAnchor handleClick={callback} />);
    const elementToTest_anchor = component.childAt(0);
    // act - simulate event to invoke callback,
    // and query that tested element is the expected type
    elementToTest_anchor.simulate('click');
    const typeCheck = elementToTest_anchor.type();
    // assert - confirm that result variable has a new value of '7'
    // and that element is of type 'a'
    expect(result).toEqual(7);
    expect(typeCheck).toEqual('a');
  });

    test('should assign prop ( displayValue ) with the result having'
    + ' the appearance of "${displayValue_prop}"', () => {
    // arrange - setup prop variable(s)
    const displayValue_prop = "displayValue-z3fm9";

    const component = shallow(<ListAnchor displayValue={displayValue_prop} />);
    const elementToTest_displayValue = component.childAt(0).childAt(0);
    // act - find the location of the displayed value and
    // check that said value is equal to the expected value
    const result = elementToTest_displayValue.equals(`${displayValue_prop}`);
    // assert - confirm that the above check resolves true
    expect(result).toBe(true);
  });

});
