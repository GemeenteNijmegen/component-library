## Sticky Content

Based on the version from MDB:<br>
https://mdbootstrap.com/legacy/4.3.2/?page=javascript/sticky-content

Aside from this version, an MDB demo can be seen [here](https://mdbootstrap.com/live/_MDB4/docs/sticky-content.html) with some more layout and content.

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use](/docs/how-to-use).

The `stopper` is an element which stops the Sticky Content.

```javascript
    $(".sticky").sticky({
        topSpacing: 90,
        zIndex: 2,
        stopper: "#YourStopperId"
    });
```
