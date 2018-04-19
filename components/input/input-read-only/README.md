## Input Read Only

Based on the version from MDB:<br>
{{ mdbootstrapPath '/components/inputs/' }}

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* MDB framework defines that the input element comes prior to the label element
* It's best practice to have an input element accompanied with a label element which are *connected* via the `for` attribute on the label element and the corresponding `id` on the input element
* The read only state is defined by
  * the `disabled` attribute on the input element
  * the `disabled` class on the label element