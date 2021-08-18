## Radio button

Base on the version from MDB: <br>
{{ mdbootstrapPath '/jquery/forms/radio-button/' }}

A 'radio button' is a component used to allow a user to make a single choice among a number of options (whereas Checkboxes are used for selecting multiple options).

### Checked state

Add a `checked` attribute to the `<input>` element to pre-select a radio button when the page loads.

The `checked` attribute is a boolean attribute.

The checked attribute can be used with `<input type="checkbox">` and `<input type="radio">`.

### Name property

To create a group of radio buttons (to enable single-choice behavior) you have to set to each of the `<input>` elements the same value of the `name` property.

### Disabled state
Add a `disabled` boolean attribute to the `<input>` element and the custom indicator and label description will be automatically styled and blocked. To provide a proper cursor styling for the radio button, apart from setting a `disabled` attribute you’ll also need to add the `.disabled` class to the `<label>` element.

A disabled `<input>` element is unusable and un-clickable.

## Inline

Group default radio buttons or checkboxes on the same horizontal row by adding the `.form-check-inline` class to any parent element of the `<input>` element.
