## Carousel

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/carousel/' }}

With custom play/pause addition.

### Accessibility

Regarding the `alt` attribute on the images, please follow the decision tree as can be seen here https://www.w3.org/WAI/tutorials/images/decision-tree/

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example with the play/pause addition and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```html
{{ render '@carousel-scripts' }}
```

### Notes

* MDB carousel by default starts sliding through the available slides, therefor a play/pause functionality has been added on top of the component to comply to the first bullet point in *"What makes a carousel accessible"* (https://www.w3.org/WAI/tutorials/carousels/)

* When used incorrectly this component may be vulnerable to an XSS-exploit. When using this component, please make sure to properly sanitize all href-values in <a>-elements on the page. An href including the data-slide attribute and nót using the data-target attribute may result in the carousel code executing the (javascript) payload of the href-attribute. To prevent this:
- Make sure to sanitize all input
- Use CSP-headers preventing inline scripts wherever possible
- Use the data-target attribute when implementing the carousel component.
