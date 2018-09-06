## Tooltips

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/tooltips/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example which reads the `title` and `placement` data attributes on the element to be used for the `tooltip` and should be placed in the `Additional component(s) script` section as documented in [How to use](.../docs/how-to-use).

```javascript
<script>
    $('[data-toggle="tooltip"]').tooltip();
</script>
```
