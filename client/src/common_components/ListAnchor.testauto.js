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


// Tests checking elements are rendered with correct parent/child relationships
  test('should render <a> within <li>', () => {
    // act - checking that route 'li a' has rendered correctly
    const routeExists = noPropComponent.exists('li a');
    // assert - verifying that above check for existance was succesful
    expect(routeExists).toBe(true)
  });


// Tests checking props are correctly assigned
  test('should assign props (url, and path) to the href attributeon the <a> with test name of anchor - result should display: "url/path"', () => {
    // arrange - set up props and components
    const url = "url-fu2wr";
    const path = "path-2jb39";

    const component = shallow(<ListAnchor url={url} path={path} />);
    const elementToTest_anchor = component.childAt(0).childAt(0);
    // act - make queries on component
    const href = elementToTest_anchor.prop('href');
    const typeCheck = elementToTest_anchor.type();
   // assert - confirm that anchor has href attribute with the expected value,
   // and is of type 'a'
    expect(href).toEqual(`${url}/${path}`);
    expect(typeCheck).toEqual('a');
  });

});
