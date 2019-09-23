## Pills

This component is for showing a set of buttons in a row. It can be used as menu or tabs for a tabbed page.

### The role attribute

Make sure you use the right [role attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles) based on the usecase.

In this example we defined it as a menu, see the [tabs component](tabs) for an example where it is used as a tab.

### Defining the active element

You can mark the active element by adding the attribute `aria-current="true"`. If you have a specific use for the buttons (like page, location, date) you can use different values for `aria-current`. See [this page](http://design-patterns.tink.uk/aria-current/) for more examples.

When you are using the pills as tabs you can use `aria-selected="true"` to mark the currently selected tab.
