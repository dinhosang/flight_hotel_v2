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
  siblingOrder: null
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
  },
  values: [
    {
      name: "href",
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      propNames: ["url", "path"],
      resultAppearance: ["url", "/", "path"]
    },
    {
      eventType: "click",
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_EVENT,
      propNames: ["handleClick"]
    }
  ]
});
listAuto.childAttributes({
  childDetails: {
    name: "displayValue",
  },
  values: [
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_DISPLAY,
      propNames: ["displayValue"],
      resultAppearance: ["displayValue"]
    }
  ]
})

// AnchorImage
const anchorImagePath = Path.join(__dirname, "./AnchorImage.js")
const anchorImageAuto = new Api("AnchorImage", anchorImagePath);
// TestAutomator tracking child nodes
anchorImageAuto.child({
  parent: "AnchorImage",
  type: "a",
  name:  "anchor",
  siblingOrder: null
});
anchorImageAuto.child({
  parent: "anchor",
  type: "img",
  name:  "image",
  siblingOrder: 0
});
// TestAutomator tracking attributes for child nodes
anchorImageAuto.childAttributes({
  childDetails: {
    name: "anchor",
  },
  values: [
    {
      name: "href",
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      propNames: ["domainUrl"],
      resultAppearance: ["domainUrl"]
    },
    {
      name: "id",
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      propNames: ["id"],
      resultAppearance: ["id"]
    },
    {
      name: "className",
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      propNames: ["width"],
      resultAppearance: ["width"]
    },
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_EVENT,
      eventType: "click",
      propNames: ["handleClick"]
    }
  ]
});
anchorImageAuto.childAttributes({
  childDetails: {
    name: "image",
  },
  values: [
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      name: "src",
      propNames: ["image"],
      resultAppearance: ["image"]
    },
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      name: "alt",
      propNames: ["altText"],
      resultAppearance: ["altText"]
    }
  ]
});

// ListAnchor
const detailsPath = Path.join(__dirname, "./Details.js")
const detailsAuto = new Api("Details", detailsPath);
// TestAutomator tracking child nodes
detailsAuto.child({
  parent: "Details",
  type: "details",
  name:  "details",
  siblingOrder: null
});
detailsAuto.child({
  parent: "details",
  type: "summary",
  name:  "summary",
  siblingOrder: 0
});
detailsAuto.child({
  parent: "summary",
  type: "other",
  name:  "summaryDisplay",
  siblingOrder: 0
});
detailsAuto.child({
  parent: "summary",
  type: "span",
  name:  "caret",
  siblingOrder: 1
});
detailsAuto.child({
  parent: "details",
  type: "other",
  name:  "children",
  siblingOrder: 1
});
// TestAutomator tracking attributes for child nodes
detailsAuto.childAttributes({
  childDetails: {
    name: "details",
  },
  values: [
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      name: "open",
      propNames: ["open"],
      resultAppearance: ["open"]
    },
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      name: "id",
      propNames: ["id"],
      resultAppearance: ["id"]
    },
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_NON_EVENT,
      name: "className",
      propNames: ["span"],
      resultAppearance: ["span"]
    }
  ]
});
detailsAuto.childAttributes({
  childDetails: {
    name: "summary",
  },
  values: [
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_EVENT,
      eventType: "click",
      propNames: ["handleClick"]
    }
  ]
});
detailsAuto.childAttributes({
  childDetails: {
    name: "summaryDisplay",
  },
  values: [
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_DISPLAY,
      propNames: ["summary"],
      resultAppearance: ["summary"]
    }
  ]
});
detailsAuto.childAttributes({
  childDetails: {
    name: "caret",
  },
  values: [
    {
      assignmentType: Api.ASSIGNMENT_TYPE.HARD_CODED,
      propNames: ["className"],
      resultAppearance: ["dropdown-caret"]
    }
  ]
});
detailsAuto.childAttributes({
  childDetails: {
    name: "children",
  },
  values: [
    {
      assignmentType: Api.ASSIGNMENT_TYPE.SIMPLE_DISPLAY,
      propNames: ["children"],
      resultAppearance: ["children"]
    }
  ]
});


listAuto.process();
anchorImageAuto.process();
detailsAuto.process();
