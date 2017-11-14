Layer Mask [![Build Status](https://travis-ci.org/cawabunga/layer-mask.svg?branch=master)](https://travis-ci.org/cawabunga/layer-mask) [![Coverage Status](https://coveralls.io/repos/cawabunga/layer-mask/badge.svg?branch=master)](https://coveralls.io/r/cawabunga/layer-mask?branch=master)
===

The javascript library for creation an overlay that covers the whole page except selected elements on the page.

Live demo:
- [basic usage](https://cawabunga.github.io/layer-mask/)
- [demo integration](https://cawabunga.github.io/layer-mask/tour.html) with [Shepherd](https://github.com/HubSpot/shepherd)

Here are useful cases: 
- allow/disallow clicking the specific elements on the page
- creating a backdrop that highlights elements on the page

Some details about the library:
- supports handling the fixed positioned elements
- written using ES6 and CommonJS modules (published as UMD)
- uses **flexboxes** by the default, but you can [override it](src/layer-mask.css)

### Installation
`$ npm install layer-mask`

### Documentation
Please see the source code of [LayerMask](src/maskCreators/LayerMask.js) and [LayerMaskManager](src/LayerMaskManager.js).

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
const { LayerMaskManager, LayerMask } = require('layer-mask');

const container = document.querySelector('body');
const maskManager = new LayerMaskManager(container);

const mask = new LayerMask(document.querySelectorAll('#link-1, #link-2'));
const maskElement = maskManager.revealMask(mask);

maskElement.onclick = () => {
    maskManager.hideActiveMask();
};
```

### Roadmap
- release
