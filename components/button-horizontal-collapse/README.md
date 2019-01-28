## Button Horizontal Collapse

A custom component created for Nijmegen.

### Accessibility

Be sure to add textual content using `aria-label` to the anchors or buttons so this will be available to assistive technologies.
Icons should be hidden from screen-readers by applying `aria-hidden="true"` to the child span `mdi` element.

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```html
{{ render '@button-horizontal-collapse-scripts' }}
```
