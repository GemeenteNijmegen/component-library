$('.horizontal-collapse').on('click', '.btn-floating-collapse', function() {
    if (
        $(this)
            .parent()
            .hasClass('active')
    ) {
        $(this)
            .parent()
            .removeClass('active');
        $(this).attr('aria-expanded', 'false');
        $(this)
            .parent()
            .find('.expand-horizontal')
            .removeClass('slideInRight')
            .addClass('slideOutRight')
            .prop('hidden', true);
    } else {
        $(this)
            .parent()
            .addClass('active');
        $(this).attr('aria-expanded', 'true');
        $(this)
            .parent()
            .find('.expand-horizontal')
            .removeClass('slideOutRight')
            .addClass('slideInRight')
            .prop('hidden', false);
    }
});
