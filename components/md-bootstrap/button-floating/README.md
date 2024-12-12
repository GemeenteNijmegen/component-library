## Button Floating

Based on the version from MDB:<br>
{{ mdbootstrapPath '/components/buttons/#floating-buttons' }}

### Accessibility

Be sure to add textual content using `aria-label` to the anchors or buttons so this will be available to assistive technologies. This should be an action, for example: `Add item` , `Delete` or `Leave a message`.

Icons should be hidden from screen-readers by applying `aria-hidden="true"` to the child span `mdi` element.
If the button is a link, then use an anchor tag instead `<a class="btn-floating btn-large btn-floating-primary" href="/add" aria-label="Toevoegen">...</a>`.

### Using

No additional actions, aside from the markup, are needed to use this component.
