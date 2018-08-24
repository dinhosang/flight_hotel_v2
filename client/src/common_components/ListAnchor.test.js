import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListAnchor from './ListAnchor.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe('Common Component - ListAnchor', () => {

  let noPropComponent

  // beforeAll not before as with mocha
  // beforeEach still named as in mocha
  // no name allowed in beforeAll or beforeEach, unlike mocha
  beforeAll(() => {
    noPropComponent = shallow(<ListAnchor />);
  });

  // it('name', fn) will also work as an alias for test('name', fn) in Jest
  // remember it is not mocha
  test('should render one li tag', async () => {
    // enzyme
    const numberOfLiTags = noPropComponent.find('li').length;
    // jest
    expect(numberOfLiTags).toEqual(1);
  });

  test('should render one anchor tag', async () => {
    // enzyme
    const numberOfATags = noPropComponent.find('li').length;
    // jest
    expect(numberOfATags).toEqual(1);
  })

  test('should render the anchor tag within the li tag', async () => {
    // enzyme
    const numberofATagsWithinLiTags = noPropComponent.exists('li a');
    // jest
    expect(numberofATagsWithinLiTags).toBe(true);
  })

  test('should assign props nameed url and path to the href in form url/path', async () => {
    // setup
    const url = 'homeurl';
    const path = 'test-path';
    // enzyme
    const component = shallow(<ListAnchor url={url} path={path} />);
    const href = component.find('a').prop('href');
    // jest
    expect(href).toEqual(`${url}/${path}`);
  })

  test('should assign prop named handleClick as a callback to onClick on the anchor tag which will fire on a click event', async () => {
    // setup
    let callbackResult = 0;
    const callback = () => {
      callbackResult += 3;
    };
    // jest
    expect(callbackResult).toEqual(0);
    // enzyme
    const component = shallow(<ListAnchor handleClick={callback}/>);
    const result = component.find('a').simulate('click');
    // jest
    expect(callbackResult).toEqual(3);
  })

  test('should assign displayValue prop as a child within the anchor tags', async () => {
    // setup
    const displayValue = "value";
    // enzyme
    const component = shallow(<ListAnchor displayValue={displayValue}/>);
    const correctValShown = component.find('a').children().equals(displayValue);
    // jest
    expect(correctValShown).toBe(true);
  })
})
