## Time Picker

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/time-picker/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use](.../docs/how-to-use).

```javascript
<script>
    $('.timepicker').pickatime({
        twelvehour: false,
        donetext: 'Gereed'
    });
</script>
```

### Notes

* For demo purpose only, the time picker opens automatically.
* MDB framework defines that the input element comes prior to the label element
* It's best practice to have an input element accompanied with a label element which are *connected* via the `for` attribute on the label element and the corresponding `id` on the input element
