var timePicker = $('#time-picker-example-input-hidden').pickatime({
    twelvehour: false,
    donetext: 'Gereed',
    beforeShow: function() {
        $('#time-picker-example-input-hidden').val($('#time-picker-example-input').val());
    },
    afterDone: function() {
        $('#time-picker-example-input').val($('#time-picker-example-input-hidden').val());
    },
});

$('#time-picker-example-button').click(function(event) {
    event.stopPropagation();
    timePicker.pickatime('show');
});
