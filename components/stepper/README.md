## Stepper

Based on the version from MDB:<br />
{{ mdbootstrapPath 'components/bootstrap-steps-stepper/' }}

And, Google's Material design:<br />
https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps

### Accessibility

Make sure that the step bar has the right text in the span identified by by the class `step-status`. This helps screenreader users to hear on which step they are.
For the current step we expect the tab to have the text "Actieve stap", and when the step is completed "Voltooide stap".

### Using

The stepper is designed to work with up to six steps and should appear only once per page.

The stepper allows both forward and backward progression once each step is valid.

Back buttons should only be included on the steps that need it. For instance, not step 1.

The step labels and form input can be changed freely to suit your needs.

The stepper uses a horizontal view on large width screen, vertical view on medium width screens and mobile view on small width screens.

As shown (commented out) within step 5 of the example, a submit button could be used at any point and will get triggered on step progression:
```html
<button class="btn btn-primary nextBtn float-right" type="submit">Submit</button>
```
The submit button will post the form inputs, and could appear on any step.

The below JavaScript is required to use the Stepper component and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use' }}).

```html
{{ render '@stepper-scripts' }}
```

### Notes

* When renaming the `id`, `href`, `aria-controls` and/or `aria-labelledby` for your use-case, be sure to rename all occurrences
* In the list with steps, each step has its own span indentified by the class `step-status` telling the status of the step
  * For completed steps, we use the text "Voltooide stap"
  * For the current step, we use the text "Actieve stap"
