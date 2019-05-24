## Autocomplete

This component will show the facets of search results

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to initialize the facets and the facets script itself.
Both scripts be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

Look at the example to see how the data needs to be formatted that you can feed the facets script.

#### Example on how to implement:
```html
{{ render '@facets-example-scripts' }}
```

#### Autocomplete script:
```html
{{ render '@facets-scripts' }}
```
