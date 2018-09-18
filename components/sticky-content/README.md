## Sticky Content

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/stickycontent/' }}

Aside from this version, an MDB demo can be seen [here]({{ mdbootstrapPath '/previews/docs/latest/html/sticky-content/sticky-content.html' }}) with some more layout and content.

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

The `stopper` is an element which stops the Sticky Content.

```javascript
    $(".sticky").sticky({
        topSpacing: 90,
        zIndex: 2,
        stopper: "#YourStopperId"
    });
```

### Notes

The component may be used with every heading (`H1 - H6`) level, so you are free to use which heading level suits your use-case.
