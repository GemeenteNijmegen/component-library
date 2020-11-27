const KEY_ENTER = 'Enter';
const KEY_SPACE = ' ';

$(() => {
    $('.navbar-skiplinks a').on('keydown', function(event) {
        if (![KEY_ENTER, KEY_SPACE].includes(event.key)) {
            return;
        }
        event.target.click();
        event.preventDefault();
    });
});
