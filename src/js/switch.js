$('.check-switch input[role="switch"]').each(function() {
    $(this).on('click', function() {
        $(this).attr('aria-checked', $(this).is(':checked'));
    });
    $(this).attr('aria-checked', $(this).is(':checked'));
});
