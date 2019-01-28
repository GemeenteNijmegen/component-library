## Search Results

A custom component created for Nijmegen, which relies on a third-party service OpenIndex (https://www.openindex.io) to show results.

### Using

Aside from the markup, an extra JavaScript include and OpenIndex configuration is needed to have a fully functional component.

Adding underneath `script` tag after the other required `script` tags (as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }})) and before the closing `body` tag is needed.

```javascript
{{ render '@openindex-scripts' }}
```
To render actual search results based on URL hash parameter `#q`, underneath OpenIndex configuration is needed which can follow above JavaScript include.

```javascript
{{ render '@openindex-config-scripts' }}
```

### Notes

* As an example, a predefined search term with value "paspoort" is used here
