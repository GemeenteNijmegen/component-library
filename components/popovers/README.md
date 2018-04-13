## Popovers

Based on the version from MDB:<br>
https://mdbootstrap.com/legacy/4.3.2/?page=javascript/popovers

### Using

To start using this component, some JavaScript is needed to initialize it.
Underneath a jQuery example which reads the `title`, `placement` and `content` data attributes on the element to be used for the `popover`.

```javascript
<script>
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    });
</script>
```
