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
- allow/disallow clicking particular elements on the page (modifier: "click-through")
- creating a backdrop that highlights elements on the page (modifier: "spotlight")

### Getting Started

Install with NPM:
```sh
npm install layer-mask --save
```

Install with Yarn:
```sh
yarn add layer-mask
```

Import into your project:
```javascript
import { LayerMask, LayerMaskManager } from 'layer-mask'; // ES Import
// or
const { LayerMask, LayerMaskManager } = require('layer-mask'); // CommonJS
```
There are also small helper CSS file needs to be included `layer-mask/dist/layer-mask.css` by whatever approach that fits to your project.

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
You can add custom CSS classes to the mask element, simply provide a `modifiers` configuration.
```javascript
const mask = new LayerMask(document.querySelectorAll('#dummy'), {
    modifiers: [
        // Predefined ones
        'spotlight',     // grays out cells around the target elements
        'click-through', // prevent from clicking outside the target elements
        'debug',         // sames as "spotlight" but in yellow color :)
    ],
});
const maskEl = mask.createMask();
```

### Roadmap
- Add flow typings
- Release
