## Searchresults Template

A custom template created for Nijmegen to showcase the search results component from this library in one overall view.

### Using

Aside from the markup, some extra actions are needed.

#### Pandosearch integration

For the search a real-time feed is provided by Pandosearch.

#### Example on how to implement:

**Please note:** The line `pandosearch.doNotTrack = true;` should be removed on production.
```html
{{ render '@search-results-pandosearch-example-scripts' }}
```

### Notes

* Used components: see the "References" in the component library info tab
* Nijmegen has a collaboration with Pandosearch (https://www.pandosearch.com) for the search and search results implementation, as can be read in the `Using` section here.
