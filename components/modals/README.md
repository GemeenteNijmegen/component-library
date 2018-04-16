## Modal

Based on the version from MDB:<br>
https://mdbootstrap.com/legacy/4.3.2/?page=javascript/modals

### Using

No additional actions, aside from the markup, are needed to use this component.

### Notes

* MDB defines various predefined modals, yet Nijmegen only needed 3 of the "central modal" type therefor the library supports `small`, `medium` and `large`
* The modal title in this component is rendered via a paragraph element, since it's unknown in advance what the implementors document heading level structure would be, it's not advisable to define a specific heading element (`H1 - H6`) in this component.<br>
**However**, the component has been structured to work with every heading (`H1 - H6`) level as modal title, so you are free to use which heading level suits your use-case.