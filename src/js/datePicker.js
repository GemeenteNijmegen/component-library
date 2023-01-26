$('.date-picker').each(function() {
    const $picker = this;
    const $datePicker = $('.date-picker-button', $picker).pickadate({
        monthsFull: [
            'januari',
            'februari',
            'maart',
            'april',
            'mei',
            'juni',
            'juli',
            'augustus',
            'september',
            'oktober',
            'november',
            'december',
        ],
        monthsShort: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
        weekdaysFull: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
        weekdaysShort: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
        today: 'vandaag',
        clear: 'verwijderen',
        close: 'sluiten',
        firstDay: 1,
        format: 'dd/mm/yyyy',
        formatSubmit: 'yyyy/mm/dd',
        buttonClear: 'none',
        onSet: function() {
            $('.date-picker-input', $picker).val(this.get('value')).removeClass('is-invalid');
        },
        onStart: function() {
            $('.picker__nav--prev, .picker__nav--next').attr('tabindex', '-1');
        },
    });
    const picker = $datePicker.pickadate('picker');

    $('.date-picker-input', $picker).on('change', function() {
        if (dateIsValid(this.value)) {
            picker.set('select', parseDateInput(this.value));
            $(this).removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid');
        }
    });
});

function parseDateInput(dateInput) {
    var dateSplitSlashes = dateInput.split(/[- /.]+/);
    if (dateSplitSlashes.length === 3) {
        return new Date(dateSplitSlashes[2], dateSplitSlashes[1] - 1, dateSplitSlashes[0]);
    }
    return new Date(dateInput.substr(4, 4), dateInput.substr(2, 2) - 1, dateInput.substr(0, 2));
}

function dateIsValid(dateInput) {
    return /(0?[1-9]|[12][0-9]|3[01])[- /.]?(0?[1-9]|1[012])[- /.]?(19|20)\d\d/.test(dateInput);
}
