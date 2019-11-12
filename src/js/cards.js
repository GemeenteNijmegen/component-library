const $ = window.$;

if ('objectFit' in document.documentElement.style === false) {
    $('.card figure img.content').each(function() {
        const imageUrl = $(this).prop('src');
        $(this)
            .parent()
            .css('backgroundImage', 'url(' + imageUrl + ')')
            .addClass('compatibility-object-fit');
    });
}
