import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AnchorImage from './AnchorImage.js';

Enzyme.configure({
  adapter: new Adapter()
});

describe('AnchorImage - common_components/AnchorImage.js', () => {

// Setting up variable for propless version of AnchorImage
  let noPropComponent

// Assigning shallow copy of propless version of AnchorImage
  beforeAll(() => {
    noPropComponent = shallow(<AnchorImage />);
  });


// Tests checking expected number of html elements
  test('should render 1 <a> tag', () => {
    // act - find number of <a> tags
    const numberOfATags = noPropComponent.find('a').length;
    // assert - number of <a> tags should be 1
    expect(numberOfATags).toEqual(1)
  });

  test('should render 1 <img> tag', () => {
    // act - find number of <img> tags
    const numberOfImgTags = noPropComponent.find('img').length;
    // assert - number of <img> tags should be 1
    expect(numberOfImgTags).toEqual(1)
  });


// Tests checking elements are rendered with correct parent/child relationships
  test('should render <img> within <a>', () => {
    // act - checking that route 'a img' has rendered correctly
    const routeExists = noPropComponent.exists('a img');
    // assert - verifying that above check for existance was succesful
    expect(routeExists).toBe(true)
  });


// Tests checking props are correctly assigned
  test('should assign prop ( domainUrl ) to the href attribute'
  + ' on the <a> with test name of anchor - result should display:'
  + ' "domainUrl"', () => {
    // arrange - set up props and components
    const domainUrl_prop = "domainUrl-yd485";

    const component = shallow(<AnchorImage domainUrl={domainUrl_prop} />);
    const elementToTest_anchor = component;
    // act - make queries on component
    const href = elementToTest_anchor.prop('href');
    const typeCheck = elementToTest_anchor.type();
   // assert - confirm that anchor has href attribute with the expected value,
   // and is of type 'a'
    expect(href).toEqual(`${domainUrl_prop}`);
    expect(typeCheck).toEqual('a');
  });

  test('should assign prop ( id ) to the id attribute'
  + ' on the <a> with test name of anchor - result should display:'
  + ' "id"', () => {
    // arrange - set up props and components
    const id_prop = "id-8bnbl";

    const component = shallow(<AnchorImage id={id_prop} />);
    const elementToTest_anchor = component;
    // act - make queries on component
    const id = elementToTest_anchor.prop('id');
    const typeCheck = elementToTest_anchor.type();
   // assert - confirm that anchor has id attribute with the expected value,
   // and is of type 'a'
    expect(id).toEqual(`${id_prop}`);
    expect(typeCheck).toEqual('a');
  });

  test('should assign prop ( width ) to the className attribute'
  + ' on the <a> with test name of anchor - result should display:'
  + ' "width"', () => {
    // arrange - set up props and components
    const width_prop = "width-40soe";

    const component = shallow(<AnchorImage width={width_prop} />);
    const elementToTest_anchor = component;
    // act - make queries on component
    const className = elementToTest_anchor.prop('className');
    const typeCheck = elementToTest_anchor.type();
   // assert - confirm that anchor has className attribute with the expected value,
   // and is of type 'a'
    expect(className).toEqual(`${width_prop}`);
    expect(typeCheck).toEqual('a');
  });

  test('should assign prop ( handleClick ) to the attribute'
  + ' which handles an event of type: "click". This attribute will be on the <a>'
  + ' with the test name of anchor', () => {
    // arrange - set up callback variables and components
    let result = 5;
    const callback = () => result += 2;

    const component = shallow(<AnchorImage handleClick={callback} />);
    const elementToTest_anchor = component;
    // act - simulate event to invoke callback,
    // and query that tested element is the expected type
    elementToTest_anchor.simulate('click');
    const typeCheck = elementToTest_anchor.type();
    // assert - confirm that result variable has a new value of '7'
    // and that element is of type 'a'
    expect(result).toEqual(7);
    expect(typeCheck).toEqual('a');
  });

  test('should assign prop ( image ) to the src attribute'
  + ' on the <img> with test name of image - result should display:'
  + ' "image"', () => {
    // arrange - set up props and components
    const image_prop = "image-equd8";

    const component = shallow(<AnchorImage image={image_prop} />);
    const elementToTest_image = component.childAt(0);
    // act - make queries on component
    const src = elementToTest_image.prop('src');
    const typeCheck = elementToTest_image.type();
   // assert - confirm that image has src attribute with the expected value,
   // and is of type 'img'
    expect(src).toEqual(`${image_prop}`);
    expect(typeCheck).toEqual('img');
  });

  test('should assign prop ( altText ) to the alt attribute'
  + ' on the <img> with test name of image - result should display:'
  + ' "altText"', () => {
    // arrange - set up props and components
    const altText_prop = "altText-zoo9e";

    const component = shallow(<AnchorImage altText={altText_prop} />);
    const elementToTest_image = component.childAt(0);
    // act - make queries on component
    const alt = elementToTest_image.prop('alt');
    const typeCheck = elementToTest_image.type();
   // assert - confirm that image has alt attribute with the expected value,
   // and is of type 'img'
    expect(alt).toEqual(`${altText_prop}`);
    expect(typeCheck).toEqual('img');
  });

});
