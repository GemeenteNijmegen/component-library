## Autocomplete

This component will show the autocomplete results

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to initialize the autocomplete and the autocomplete script itself.
Both scripts be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

You need to initialize the autocomplete class by passing a function that will fetch the search results.
The function will get the search query as it's first parameter and a callback as a second parameter. You need to call the callback to show the search results. Pass an array of objects with at least an url and title: `[{url: 'link', title: 'the title'}]`

#### Example on how to implement:
```html
{{ render '@autocomplete-example-scripts' }}
```

#### Autocomplete script:
```html
{{ render '@autocomplete-scripts' }}
```
