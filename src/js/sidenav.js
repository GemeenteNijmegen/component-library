$('.collapsible-header').on('click', function() {
    var toggle = $(this).attr('aria-expanded') === 'true' ? 'false' : 'true';
    $(this).attr('aria-expanded', toggle);
});