## Cards Filename

Based on the version from MDB:<br>
{{ mdbootstrapPath '/components/cards/#basic-example' }}

### Accessibility

Please note the usage of the `aria-label` attribute on the anchor and is there to provide a more descriptive label to assistive technology.<br>
(http://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140408/ARIA8#ARIA8-examples)

Regarding the `alt` attribute on the image, please follow the decision tree as can be seen here https://www.w3.org/WAI/tutorials/images/decision-tree/

### Notes

* The card title in this component is rendered via a paragraph element, since it's unknown in advance what the implementors document heading level structure would be, it's not advisable to define a specific heading element (`H1 - H6`) in this component.<br>
**However**, the component has been structured to work with every heading (`H1 - H6`) level as card title, so you are free to use which heading level suits your use-case.
* The card will fill the with of it's parent so you have to take care of responsiveness yourself (in this example we used the [bootstrap grid system](https://mdbootstrap.com/docs/jquery/layout/grid-usage/) to solve this)
