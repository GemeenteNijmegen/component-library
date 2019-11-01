## Date Picker

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/date-picker/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```html
{{ render '@date-picker-scripts' }}
```

### Accessibility

The datepicker icon can not be used with a keyboard because the mdb datepicker is not accessible enough. Keyboard users can use the input field to type a date directly. Dates in the following format will be parsed:
- 30/05/2015
- 30-05-2015
- 30.12.2015
- 30 05 2015
- 30052015

Make sure that you link a description with `aria-describedby` to the input element of the date picker. Screenreaders will anounce the text in the linked element when the input element gets focus.
