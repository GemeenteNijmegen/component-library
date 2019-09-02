## Autocomplete

This component will show the autocomplete results

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to initialize the autocomplete and the autocomplete script itself.
Both scripts be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

You need to initialize the autocomplete class by passing a function that will fetch the search results.
The function will get the search query as it's first parameter and a callback as a second parameter. You need to call the callback to show the search results. Pass an array of objects with at least an url and title or with a header to show an header row: `[{header: 'Results:'}, {url: 'link', title: 'search result'}]`.

You can also add the `class` property. That class is added to the item.
When an item is a search suggestion instead of an actual result then you should add the class `search` to the item. The item will be rendered with a search icon on the left side to indicate that it is a search suggestion.

### Note

* You need to keep the element with id `autocomplete-search-results-announcer` empty. When there are search results the amount of results will be announced via this element.

#### Example on how to implement:
```html
{{ render '@autocomplete-example-scripts' }}
```

#### Autocomplete script:
```html
{{ render '@autocomplete-scripts' }}
```
