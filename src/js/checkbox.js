const $ = window.$;

$('.form-check-input')
    .off('click')
    .on('click', function() {
        $(this).attr('aria-checked', $(this).is(':checked'));
    });
