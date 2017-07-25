## Sticky Content

Based on the version from MDB (https://mdbootstrap.com/javascript/stickycontent/). A demo can be seen [here](https://mdbootstrap.com/live/_MDB4/docs/sticky-content.html).

### Using the sticky content elements in HTML
To use the sticky content you can use  a stopper. That tells the sticky content to not be sticky anymore.
```javascript
    $(".sticky").sticky({
        topSpacing: 90
        , zIndex: 2
        , stopper: "#YourStopperId"
    });
```
