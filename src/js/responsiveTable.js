$('.responsive-table').each(function() {
    const find = $(this).hasClass('complex-table') ? 'thead th:not(:first-child)' : 'thead th';
    const headings = $(this)
        .find(find)
        .map(function() {
            return this.textContent;
        })
        .toArray();

    if (headings.length > 0) {
        $(this)
            .find('tbody td')
            .each(function(tdIdx) {
                this.setAttribute('data-title', headings[tdIdx % headings.length]);
            });
    }
});
