Layer Mask [![Build Status](https://travis-ci.org/cawabunga/layer-mask.svg?branch=master)](https://travis-ci.org/cawabunga/layer-mask) [![Coverage Status](https://coveralls.io/repos/cawabunga/layer-mask/badge.svg?branch=master)](https://coveralls.io/r/cawabunga/layer-mask?branch=master)
===

The javascript library that breaks the page into cells around specified element(s).

### Showcase
Here are the target element is a dialog window:

![](https://raw.github.com/cawabunga/layer-mask/master/docs/images/showcase-cells.gif)


Live demo:
- [basic usage](https://cawabunga.github.io/layer-mask/)
- [demo integration](https://cawabunga.github.io/layer-mask/tour.html) with [Shepherd](https://github.com/HubSpot/shepherd)

Here are useful cases:
- allow/disallow clicking the specific elements on the page (modifier: "click-through")
- creating a backdrop that highlights elements on the page (modifier: "spotlight")

Some details about the library:
- supports handling the fixed positioned elements
- written using ES6 and CommonJS modules (published as UMD)
- uses `display: table-*` rules by the default, but you can [override it](src/layer-mask.css)

### Installation
- `$ npm install layer-mask`
- Then include JS (dist/layer-mask.js) and CSS (dist/layer-mask.css) to your application

### Documentation
Please see the source code of [LayerMask](src/LayerMask.js) and [LayerMaskManager](src/LayerMaskManager.js).

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

### Modifiers
You add custom css classes to the mask element, simply pass `modifiers` configuration.
```javascript
const mask = new LayerMask(document.querySelectorAll('#dummy'), {
    modifier: [
        // Predefined ones
        'spotlight',     // grays out cells around the target elements
        'click-through', // prevent from clicking outside the target elements
        'debug',         // sames as "spotlight" but in yellow color :)
    ],
});
const maskEl = mask.createMask();
```

### Roadmap
- release
