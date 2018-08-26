import Path from 'path';

import Api from '../auto_tester/TestAutomatorApi.js';

// ListAnchor
const ListAnchorPath = Path.join(__dirname, "./ListAnchor.js")
const listAuto = new Api("ListAnchor", ListAnchorPath);
// TestAutomator tracking child nodes
listAuto.child({
  parent: "ListAnchor",
  type: "li",
  name:  "list"
});
listAuto.child({
  parent: "list",
  type: "a",
  name:  "anchor"
});
listAuto.child({
  parent: "anchor",
  type: "other",
  name:  "displayValue"
});

// TestAutomator tracking attributes for child nodes
listAuto.childAttributes({
  childDetails: {
    name: "anchor",
    jsx: true
  },
  attributes: [
    {
      name: "href",
      assignment: {
        type: Api.ASSIGNMENT_TYPE.STRING,
        propNames: ["url", "path"],
        appearance: "url/path"
      }
    },
    {
      name: "onClick",
      assignment: {
        type: Api.ASSIGNMENT_TYPE.EXTERNAL_CALLBACK,
        propNames: ["handleClick"]
      }
    }
  ]
});
listAuto.childAttributes({
  childDetails: {
    name: "displayValue",
    jsx: false
  },
  attributes: [
    {
      assignment: {
        type: Api.ASSIGNMENT_TYPE.DISPLAY_ONLY,
        propNames: ["displayValue"],
        appearance: "{displayValue}"
      }
    }
  ]
})

// process this file
listAuto.process();
