## Search results

This component will show the search results

### Notes

- The titles in this component are rendered via `h1` and `h2` elements, every heading (`h1 - h6`) will work so choose your own heading according the structure of the page.

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to initialize the search results.
The script needs to be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

You need to initialize the searchresults class first with the `init` function. After that you can call the `show` function with two parameters:
1. The results as an array of object with the `title`, `url` and `body` of the search result like `[{url: 'link', title: 'the title', body: 'the body'}]`
2. The searchTerm

Note: Everything enclosed in `<b></b>` tags in the search results body is highlighted.

#### Example on how to implement:
```html
{{ render '@search-results-example-scripts' }}
```
