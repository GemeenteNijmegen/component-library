## Input Error

Based on the version from MDB:<br>
https://mdbootstrap.com/legacy/4.3.2/?page=components/inputs

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* MDB framework defines that the input element comes prior to the label element
* It's best practice to have an input element accompanied with a label element which are *connected* via the `for` attribute on the label element and the corresponding `id` on the input element
* The error state is defined by
  * the `invalid` class on the input element
  * the `data-error` attribute on the label element where it's contents is shown underneath the input element