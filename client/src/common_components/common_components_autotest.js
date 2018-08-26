import Path from 'path';

import Api from '../auto_tester/TestAutomatorApi.js';


/*
*
* Test Automation Version 1
*
*/


// ListAnchor
const ListAnchorPath = Path.join(__dirname, "./ListAnchor.js")
const listAuto = new Api("ListAnchor", ListAnchorPath);
// TestAutomator tracking child nodes
listAuto.child({
  parent: "ListAnchor",
  type: "li",
  name:  "list",
  siblingOrder: 0
});
listAuto.child({
  parent: "list",
  type: "a",
  name:  "anchor",
  siblingOrder: 0
});
listAuto.child({
  parent: "anchor",
  type: "other",
  name:  "displayValue",
  siblingOrder: 0
});
// TestAutomator tracking attributes for child nodes
listAuto.childAttributes({
  childDetails: {
    name: "anchor",
    jsx: true
  },
  values: {
    nonEventAttr: [
      {
        name: "href",
        assignmentType: Api.ASSIGNMENT_TYPE.PURE_PROP_ONLY,
        propNames: ["url", "path"],
        resultAppearance: ["url", "/", "path"]
      }
    ],
    eventAtrr: [
      {
        eventType: "click",
        assignmentType: Api.ASSIGNMENT_TYPE.PURE_PROP_ONLY,
        propNames: ["handleClick"]
      }
    ]
  }
});
listAuto.childAttributes({
  childDetails: {
    name: "displayValue",
    jsx: false
  },
  values: {
    display: {
      assignmentType: Api.ASSIGNMENT_TYPE.PURE_PROP_ONLY,
      propNames: ["displayValue"],
      resultAppearance: ["displayValue"]
    }
  }
})
// process this file
listAuto.process();
