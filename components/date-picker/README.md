## Date Picker

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/date-picker/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use](/docs/how-to-use).

```javascript
<script>
    $('.datepicker').pickadate({
        monthsFull: [ 'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december' ],
        monthsShort: [ 'jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec' ],
        weekdaysFull: [ 'zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag' ],
        weekdaysShort: [ 'zo', 'ma', 'di', 'wo', 'do', 'vr', 'za' ],
        today: 'vandaag',
        clear: 'verwijderen',
        close: 'sluiten',
        firstDay: 1,
        format: 'dddd d mmmm yyyy',
        formatSubmit: 'yyyy/mm/dd',
        buttonClear: 'none'
    });
</script>
```

### Notes

* For demo purpose only, the date picker opens automatically.
* MDB framework defines that the input element comes prior to the label element
* It's best practice to have an input element accompanied with a label element which are *connected* via the `for` attribute on the label element and the corresponding `id` on the input element