$('.time-picker').each(function() {
    const $picker = this;
    const timePicker = $('.time-picker-input-hidden', $picker).pickatime({
        twelvehour: false,
        donetext: 'Gereed',
        beforeShow: function() {
            $('.time-picker-input-hidden').val($('.time-picker-input').val());
        },
        afterDone: function() {
            $('.time-picker-input').val($('.time-picker-input-hidden').val());
        },
    });

    $('.time-picker-button', $picker).click(function(event) {
        event.stopPropagation();
        timePicker.pickatime('show');
    });
});
