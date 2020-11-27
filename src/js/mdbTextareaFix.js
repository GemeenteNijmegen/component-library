$(() => {
    $('textarea.md-textarea').on('keydown', event => event.stopPropagation());
});
