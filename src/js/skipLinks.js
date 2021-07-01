const KEY_ENTER = 'Enter';
const KEY_SPACE = ' ';

$(() => {
    $('.navbar-skiplinks a, a.inline-skiplink').on('keydown', function(event) {
        if (![KEY_ENTER, KEY_SPACE].includes(event.key)) {
            return;
        }
        event.target.click();
        event.preventDefault();
    });
});
