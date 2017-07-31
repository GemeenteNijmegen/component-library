## Horizontal collapse button
This is a custom component.

### Using horizontal collapsible button in HTML
To use the horizontal collapsible button we need a little bit of js to make it.
```javascript
$('.horizontal-collapse').on('click', '.btn-floating-collapse', function () {
    if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $(this).parent().find('.expand-horizontal').removeClass('slideInRight').addClass('slideOutRight');
    } else {
        $(this).parent().addClass('active');
        $(this).parent().find('.expand-horizontal').removeClass('slideOutRight').addClass('slideInRight');
    }
});
```
