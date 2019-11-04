## Popovers

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/popovers/' }}

### Notes

- The titles in this component are rendered via `h1` elements, every heading (`h1 - h6`) will work so choose your own heading according the structure of the page.

### Using

We discourage the use of this component since it is very difficult to use with assistive technology

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example which reads the `title`, `placement` and `content` data attributes on the element to be used for the `popover` and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```html
{{ render '@popovers-scripts' }}
```
