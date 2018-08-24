import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AnchorImage from './AnchorImage.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe('Common Component - AnchorImage', () => {

  let noPropComponent;

  beforeAll(() => {
    // enzyme
    noPropComponent = shallow(<AnchorImage />);
  })

  test('should render only one anchor tag', async () => {
    // enzyme
    const numberOfAnchorTags = noPropComponent.find('a').length;
    // jest
    expect(numberOfAnchorTags).toEqual(1);
  });

  test('should render only one img tag', async () => {
    // enzyme
    const numberOfImageTags = noPropComponent.find('img').length;
    // jest
    expect(numberOfImageTags).toEqual(1)
  });

  test('should render img tag as child of anchor tag', async () => {
    // enzyme
    const rendersImgTagWithinAnchorTag = noPropComponent.find('a img').exists();
    // jest
    expect(rendersImgTagWithinAnchorTag).toBe(true);
  })

  test('should assign domainUrl prop as href on anchor tag', async () => {
    // setup
    const url = 'test-url';
    // enzyme
    const component = shallow(<AnchorImage domainUrl={url} />);
    const href = component.find('a').prop('href');
    // jest
    expect(href).toEqual(url);
  });

  test('should assign handleClick prop as a callback to onClick on the anchor tag', async () => {
    // setup
    let aValue = 0;
    const callback = () => { aValue += 3 };
    // jest
    expect(aValue).toEqual(0);
    // enzyme
    const component = shallow(<AnchorImage handleClick={callback} />);
    component.find('a').simulate('click');
    // jest
    expect(aValue).toEqual(3);
  });

  test('should assign id prop as the id to the anchor tag', async () => {
    // setip
    const idExample = 'an id';
    // enzyme
    const component = shallow(<AnchorImage id={idExample} />);
    const componentId = component.find('a').prop('id');
    // jest
    expect(componentId).toEqual(idExample);
  });

  test('should assign a class from prop named width to anchor', async () => {
    // setup
    const aClass = 'an-example';
    // enzyme
    const component = shallow(<AnchorImage width={aClass} />);
    const hasWidthClass = component.find('a').hasClass(aClass);
    // jest
    expect(hasWidthClass).toBe(true);
  });

  test('should assign as img src the value of prop named image', async () => {
    // setup
    const exampleSrc = 'an-example';
    // enzyme
    const component = shallow(<AnchorImage image={exampleSrc} />);
    const componentSrc = component.find('img').prop('src');
    // jest
    expect(componentSrc).toEqual(exampleSrc);
  });

  test('should assign as alt to img the value of prop altText', async () => {
    // setup
    const altExample = 'text here';
    // enzyme
    const component = shallow(<AnchorImage altText={altExample} />);
    const componentSrc = component.find('img').prop('alt');
    // jest
    expect(componentSrc).toEqual(altExample);
  });

});
