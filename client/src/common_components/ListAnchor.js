import React from 'react';
import Auto from '../auto_tester/automator.js';



const ListAnchor = (props) => {
  return (
    <li>
      <a href={`${props.url}/${props.path}`} onClick={props.handleClick}>
        {props.displayValue}
      </a>
    </li>
  );
}

export {ListAnchor as default};

// TestAutomator tracking Component
cosnt auto = new Auto("ListAnchor", "./ListAnchor.js");

// TestAutomator tracking child nodes
auto.child({
  mainComponent: "ListAnchor",
  parent: "ListAnchor",
  type: "li",
  name:  "list"
});
auto.child({
  mainComponent: "ListAnchor",
  parent: "list",
  type: "a",
  name:  "anchor"
});
auto.child({
  mainComponent: "ListAnchor",
  parent: "anchor",
  type: "other",
  name:  "displayValue"
});

// TestAutomator tracking attributes for child nodes
auto.trackChildAttributes({
  mainComponent: "ListAnchor",
  childDetails: {
    name: "anchor",
    jsx: true
  },
  attributes: [
    {
      name: "href",
      assignment: {
        type: auto.ASSIGNMENT_TYPE.STRING,
        propNames: ["url", "path"],
        appearance: "`${url}/${path}`"
      }
    },
    {
      name: "onClick",
      assignment: {
        type: auto.ASSIGNMENT_TYPE.EXTERNAL_CALLBACK
        propNames: ["handleClick"]
      }
    }
  ]
});
auto.trackChildAttributes({
  mainComponent: "ListAnchor",
  childDetails: {
    name: "displayValue",
    jsx: false
  },
  attributes: [
    {
      assignment: {
        type: auto.ASSIGNMENT_TYPE.DISPLAY_ONLY,
        propNames: ["displayValue"],
        appearance: "{displayValue}"
      }
    }
  ]
})
