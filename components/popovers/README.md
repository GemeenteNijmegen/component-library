## Popovers

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/popovers/' }}

### Using

We discourage the use of this component since it is very difficult to use with assistive technology

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example which reads the `title`, `placement` and `content` data attributes on the element to be used for the `popover` and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```html
{{ render '@popovers-scripts' }}
```
