## Cards Filename

Based on the version from MDB:<br>
{{ mdbootstrapPath '/components/cards/#basic-example' }}

### Accessibility

Please note the usage of the `aria-label` attribute on the anchor and is there to provide a more descriptive label to assistive technology.<br>
(http://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140408/ARIA8#ARIA8-examples)

Regarding the `alt` attribute on the image, please follow the decision tree as can be seen here https://www.w3.org/WAI/tutorials/images/decision-tree/

### Using

To start using this component, some JavaScript is needed to ensure that the image is shown correctly on older browsers.
Only one instance of this script is necessary even when using different types of cards.

```html
{{ render '@cards-scripts' }}
```

### Notes

* The card title in this component is rendered via a paragraph element, since it's unknown in advance what the implementors document heading level structure would be, it's not advisable to define a specific heading element (`H1 - H6`) in this component.<br>
**However**, the component has been structured to work with every heading (`H1 - H6`) level as card title, so you are free to use which heading level suits your use-case.
