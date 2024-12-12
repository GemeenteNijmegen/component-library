## Search results

This component will show the search results

### Notes

- The titles in this component are rendered via `h1` and `h2` elements, every heading (`h1 - h6`) will work so choose your own heading according the structure of the page.
- It is mandatory to provide an accessible label for the meta item icons. This label needs to describe the meaning of the icon in context. For example a label for a calendar icon can be "When" or "Date" and for a map-marker icon the label can be "Where" or "Location".

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to initialize the search results.
The script needs to be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

You need to initialize the searchresults class first with the `init` function. After that you can call the `show` function with two parameters:
1. The results as an array of object with the `title`, `url`, `body` and `meta` (optional) of the search result (see below)
2. The searchTerm

```js
[
    {
        url: 'link', 
        title: 'the title', 
        body: 'the body',
        meta: [
            {
                text: 'meta item text',
                icon: {
                    name: 'mdi-icon-name',
                    label: 'accessible label'
                }
            }
        ]
    }
]
```

Note: Everything enclosed in `<b></b>` tags in the search results body is highlighted.

#### Example on how to implement:
```html
{{ render '@search-results-advanced-example-scripts' }}
```
