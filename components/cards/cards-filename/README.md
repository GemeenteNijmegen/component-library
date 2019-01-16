## Cards Filename

Based on the version from MDB:<br>
{{ mdbootstrapPath '/components/cards/#basic-example' }}

### Accessibility

Please note the usage of the `aria-label` attribute on the anchor and is there to provide a more descriptive label to assistive technology.<br>
(http://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140408/ARIA8#ARIA8-examples)

Regarding the `alt` attribute on the image, please follow the decision tree as can be seen here https://www.w3.org/WAI/tutorials/images/decision-tree/

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* The card title in this component is rendered via a paragraph element, since it's unknown in advance what the implementors document heading level structure would be, it's not advisable to define a specific heading element (`H1 - H6`) in this component.<br>
**However**, the component has been structured to work with every heading (`H1 - H6`) level as card title, so you are free to use which heading level suits your use-case.
* The view-box of the image in this card has an aspect ratio of `7:3`. On Internet Explorer images with a different aspect ratio will be stretched to fit. It is recommended to use an image with an aspect ratio of exactly `7:3` to give the best experience for all users.
