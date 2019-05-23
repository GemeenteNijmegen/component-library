## Pagination

Based on the version from MDB:<br>
{{ mdbootstrapPath '/components/pagination/#disabled-active' }}

### Using only the html

No additional actions, aside from the markup, are needed to use this component.

### Using with the pagination script

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to initialize the search results and the search result script itself.
Both scripts need to be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

You need to instantiate the `Pagination` class with the following parameters:
1. int - The total number of pages
1. string - The url that is used as a link on each page number. The variable {page} is substituted with the actual page number.
1. (optional) int - The number of pages to show in the list (default 9)

Then call the `show` method with the current page as a parameter to show the results.

#### Example on how to implement:
```html
{{ render '@pagination-example-scripts' }}
```

#### Pagination script:
```html
{{ render '@pagination-scripts' }}
```
