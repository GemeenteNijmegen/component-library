## Alerts

Based on the version from MDB:<br>
https://mdbootstrap.com/legacy/4.3.2/?page=javascript/alerts

### Using

To start using this component, some JavaScript is needed to initialize it.
Underneath a jQuery example which reads the `toast-type` and `toast-text` data attributes on the element to be used for the `toastr`.

```javascript
<script>
    $('[data-toast-type]').click(function() {
        var toastrType = $(this).data('toast-type');
        var toastrText = $(this).data('toast-text');
        toastr[toastrType](toastrText);
    });
</script>
```
