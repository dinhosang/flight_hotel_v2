import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavList from './NavList.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe('Common Component - NavList', () => {

  let width;
  let noPropComponent;

  beforeAll(() => {
    width = "a-width-class";
    // enzyme
    noPropComponent = shallow(<NavList />);
  })

  test('should render a single nav tag', async () => {
    // enzyme
    const numberOfNavTags = noPropComponent.find('nav').length;
    // jest
    expect(numberOfNavTags).toEqual(1);
  });

  test('should render a single ul tag', async () => {
    // enzyme
    const numberOfUlTags = noPropComponent.find('ul').length;
    // jest
    expect(numberOfUlTags).toEqual(1);
  });

  test('should render ul tag within the nav tag', async () => {
    // enzyme
    const numberOfUlTagsWithinNavTags = noPropComponent.find('nav ul').length;
    // jest
    expect(numberOfUlTagsWithinNavTags).toEqual(1);
  })

  test('should assign the prop named width as class on the nav', async () => {
    // enzyme
    const component = shallow(<NavList width={width} />);
    const hasClassWidth = component.find('nav').hasClass(width);
    // jest
    expect(hasClassWidth).toBe(true);
  });

  test('should assign "hidden" to nav as an additional class alongside prop width, if prop display resolves to false', async () => {
    // setup
    const display = false;
    // enzyme
    const component = shallow(<NavList width={width} display={display} />);
    const hasClassHidden = component.hasClass('hidden');
    const hasClassWidth = component.hasClass(width);
    //jest
    expect(hasClassHidden).toBe(true);
    expect(hasClassWidth).toBe(true);
  })

  // discovered I had written the component if check incorrectly
  // thanks to this test.
  test('if display prop is undefined or true then class "hidden" should not be assigned, while value of width prop should still be a class', () => {
    // setup
    const display = true;
    // enzyme
    const componentWithDisplayProp = shallow(
      <NavList width={width} display={display} />
    );
    const componentWithoutDisplayProp = shallow(
      <NavList width={width} />
    );
    // enzyme + jest
    expect(componentWithDisplayProp.hasClass('hidden')).toBe(false);
    expect(componentWithDisplayProp.hasClass(width)).toBe(true);

    expect(componentWithoutDisplayProp.hasClass('hidden')).toBe(false);
    expect(componentWithoutDisplayProp.hasClass(width)).toBe(true);
  });

  test('should assign an id to nav tag from the id prop', async () => {
    // setup
    const idExample = "an-id";
    // enzyme
    const component = shallow(<NavList id={idExample} />);
    const navHasIdFromProp = component.find('nav').prop('id');
    // jest
    expect(navHasIdFromProp).toEqual(idExample);
  });

  test('should assign prop navItems as children to the ul', async () => {
    // setup
    const items = ["children", "to", "the", "ul", "component"];
    const numberOfChildren = items.length;
    // enzyme
    const component = shallow(<NavList navItems={items} />);
    const childrenLength = component.find('ul').children().length;
    // jest
    expect(childrenLength).toBe(numberOfChildren);
  });

});
