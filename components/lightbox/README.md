## Lightbox

Based on the version from MDB (https://mdbootstrap.com/legacy/4.3.2/?page=javascript/light-box)

### Using the lightbox element in HTML

To use this component we need a little bit of JavaScript to activate it.
```javascript
$("#mdb-lightbox-ui").load("{{ assetPath '/mdb-addons/mdb-lightbox-ui.html' }}");
```

### Accessibility information

Provide proper alt text for the used images according to the following decision tree: https://www.w3.org/WAI/tutorials/images/decision-tree/.

> Use the alt attribute to communicate the destination of the link or action taken.

This lightbox usecase follows the [Functional Images](https://www.w3.org/WAI/tutorials/images/functional/) guideline.
