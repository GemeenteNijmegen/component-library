## Accordion

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/collapse/#accordion' }}

### Accessibility

Be sure to add `aria-expanded` to the control element. This attribute explicitly defines the current state of the
collapsible element to screen readers and similar assistive technologies. If the collapsible element is closed by
default, it should have a value of `aria-expanded="false"`. If you’ve set the collapsible element to be open by
default using the `in` class, set `aria-expanded="true"` on the control instead. The plugin will automatically
toggle this attribute based on whether or not the collapsible element has been opened or closed.

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* When renaming the `id`, `href`, `aria-controls` and/or `aria-labelledby` for your use-case, be sure to rename all occurrences.
* The titles in this component are rendered via a `h1` element, every heading (`h1 - h6`) will work so choose your own heading according the structure of the page.
* As an example, the first item is open by default which is accomplished by
  * Omitting `class="collapsed"` on the anchor
  * Defining `aria-expanded="true"` on the anchor
  * Adding classname `show` to the tabpanel
