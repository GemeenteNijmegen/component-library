## Facets

This component will show the facets of search results

### Note

In the example the facet is rendered in a column. You should do this yourself when implementing the facets.

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to initialize the facets and the facets script itself.
Both scripts be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

Look at the example to see how the data needs to be formatted that you can feed the facets script:

```js
[
    {
        title: 'Document type',
        facets: [
            { title: 'PDF document (10)', url: '#pdf', active: true },
            { title: 'Webpage (5)', callback: callbackFunction}
        ]
    },
    {
        title: 'Date',
        facets: [
            { title: 'Last week (7)' },
            { title: 'This week (3)' },
            { title: 'Today (5)' }
        ]
    }
]
```

#### Example on how to implement:
```html
{{ render '@facets-example-scripts' }}
```

#### Facets script:
```html
{{ render '@facets-scripts' }}
```
