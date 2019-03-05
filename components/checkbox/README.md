## Checkbox

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/checkbox/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example with the play/pause addition and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```html
{{ render '@checkbox-scripts' }}
```

The example begins 'checked' / aria-checked. Set aria-checked to false and remove the checked attribute if you want the element to start unchecked.
