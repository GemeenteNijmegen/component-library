## Listing

This is a custom component which mainly consists of a title and content wrapped in an anchor
so the full element is clickable.

### Accessibility

Please note the usage of the `aria-labelledby` attribute on the anchor and is there to provide a more descriptive label to assistive technology
instead of reading all the contents of the children of this anchor
and should point to a child element with this unique `id`.

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* The listing item title in this component is rendered via a paragraph element, since it's unknown in advance what the implementors document heading level structure would be, it's not advisable to define a specific heading element (`H1 - H6`) in this component.<br>
**However**, the component has been structured to work with every heading (`H1 - H6`) level as listing item title, so you are free to use which heading level suits your use-case.
