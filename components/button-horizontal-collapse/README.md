## Horizontal collapse button

A custom component created for Nijmegen.

### Accessibility

Be sure to add textual content to the anchors so this will be available to assistive technologies. The text can be visually hidden to the user
by applying a `class="sr-only"` to the child element containing the text.<br>
When using an icon as part of the anchor, be sure to add `aria-hidden="true"` to the icon to hide it for assistive technologies since it's here for decorative reasons.<br>
(https://www.24a11y.com/2017/svg-icon-fonts-accessibility-case-study/)

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use](/docs/how-to-use).

```javascript
<script>
$('.horizontal-collapse').on('click', '.btn-floating-collapse', function() {
    if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $(this).parent().find('.expand-horizontal').removeClass('slideInRight').addClass('slideOutRight');
    } else {
        $(this).parent().addClass('active');
        $(this).parent().find('.expand-horizontal').removeClass('slideOutRight').addClass('slideInRight');
    }
});
</script>
```
