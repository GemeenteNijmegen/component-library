## Input Error

Based on the version from MDB:<br>
{{ mdbootstrapPath '/components/inputs/' }}

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* It's best practice to have an input element accompanied with a label element which are *connected* via the `for` attribute on the label element and the corresponding `id` on the input element
* The error state is defined by the `is-invalid` class on the input element
* The success state is defined by the `is-valid` class on the input element
* The `valid-feedback` and `invalid-feedback` divs can be omitted. Leaving out the `invalid-feedback` is discouraged because a screen reader user doesn't see the red line beneath the input when the input is invalid.
