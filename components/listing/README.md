## Listing

This is a custom component which mainly consists of a title and content wrapped in an anchor
so the full element is clickable.

### Accessibility

We do not use the `aria-labelledby` attribute on the anchor in order to ensure the entire link text is readable by screen readers.

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* The listing item title in this component is rendered via a `h1` element but this component works with every heading level (`h1` - `h6`).
