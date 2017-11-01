Layer Mask [![Build Status](https://travis-ci.org/cawabunga/layer-mask.svg?branch=master)](https://travis-ci.org/cawabunga/layer-mask)
===

The javascript library for creation an overlay that covers the whole page except selected elements on the page. 

Here are useful cases: 
- allow/disallow clicking the specific elements on the page
- creating a backdrop that highlights elements on the page

Some details about the library:
- supports handling the fixed positioned elements
- written using ES6 and CommonJS modules (umd version will be added in next major version)
- requires **jQuery** and **underscore** (will be removed in the next versions)
- uses **flexboxes** by the default, but you can [override it](src/mask.css)

### Installation
`$ npm install layer-mask`

### Usage
Direct usage:
```javascript
const { LayerMask } = require('layer-mask');

const myElements = document.querySelectorAll('#link-1, #link-2'); // can be passed multiple elements at one time
const layerMask = new LayerMask(myElements);
const maskElement = layerMask.createMask();

document.querySelector('body').appendChild(maskElement);
```

Using the mask manager:
```javascript
const { MaskManager } = require('layer-mask');

const container = document.querySelector('body');
const maskManager = new MaskManager(container);

const myElements = document.querySelectorAll('#link-1, #link-2');
const maskElement = maskManager.revealMask(myElements);

maskElement.onclick = () => {
    maskManager.hideActiveMask();
};
```

### Roadmap
- add tests
- remove jquery and underscore
- add bundled version
- add public example page
- release
