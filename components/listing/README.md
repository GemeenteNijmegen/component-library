## Listing

This is a custom component which mainly consists of a title and content wrapped in an anchor
so the full element is clickable.

### Accessibility

We do not use the `aria-labelledby` attribute on the anchor in order to ensure the entire link text is readable by screen readers.

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* The listing item title in this component is rendered via a paragraph element, since it's unknown in advance what the implementors document heading level structure would be, it's not advisable to define a specific heading element (`H1 - H6`) in this component.<br>
**However**, the component has been structured to work with every heading (`H1 - H6`) level as listing item title, so you are free to use which heading level suits your use-case.
