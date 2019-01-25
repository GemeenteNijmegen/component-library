## Date Picker

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/date-picker/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```javascript
<script>
    var self = this;
    var $datePicker = $('#date-picker-example-button').pickadate({
        monthsFull: [ 'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december' ],
        monthsShort: [ 'jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec' ],
        weekdaysFull: [ 'zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag' ],
        weekdaysShort: [ 'zo', 'ma', 'di', 'wo', 'do', 'vr', 'za' ],
        today: 'vandaag',
        clear: 'verwijderen',
        close: 'sluiten',
        firstDay: 1,
        format: 'dd/mm/yyyy',
        formatSubmit: 'yyyy/mm/dd',
        buttonClear: 'none',
        onSet: function(context) {
            var date = new Date(context.select);
            $('#date-picker-example-input').val(
                    date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
            );
        }
    });
    self.picker = $datePicker.pickadate("picker");

    $('#date-picker-example-input').on('change', function () {
        if (dateIsValid(this.value)) {
            self.picker.set("select", parseDateInput(this.value));
        } else {
            $(this).val('');
        }
    });

    function parseDateInput (dateInput) {
        var dateSplitSlashes = dateInput.split("/");
        if (dateSplitSlashes.length === 3) {
            return new Date(dateSplitSlashes[2], dateSplitSlashes[1] - 1, dateSplitSlashes[0]);
        }

        var dateSplitDashes = dateInput.split("-");
        if (dateSplitDashes.length === 3) {
            return new Date(dateSplitDashes[2], dateSplitDashes[1] - 1, dateSplitDashes[0]);
        }

        return new Date();
    }

    function dateIsValid(dateInput) {
        return /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(dateInput);
    }
</script>
```

### Notes

* For the best accessibility support the label should contain the date format, and not just the placeholder.
* MDB framework defines that the input element comes prior to the label element
* It's best practice to have an input element accompanied with a label element which are *connected* via the `for` attribute on the label element and the corresponding `id` on the input element
