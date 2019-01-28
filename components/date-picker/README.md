## Date Picker

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/date-picker/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```javascript
{{ render '@date-picker-scripts' }}
```

### Notes

* For the best accessibility support the label should contain the date format, and not just the placeholder.
* MDB framework defines that the input element comes prior to the label element
* It's best practice to have an input element accompanied with a label element which are *connected* via the `for` attribute on the label element and the corresponding `id` on the input element
