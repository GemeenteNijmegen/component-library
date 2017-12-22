## Alerts

Based on the version from MDB (https://mdbootstrap.com/legacy/4.3.2/?page=javascript/alerts)

### Using the alerts element in HTML

To make the alerts work proper we need to initialize them:
```javascript
<script>
    $('[data-toast-type]').click(function () {
        toastr[$(this).data('toast-type')]($(this).data('toast-text'))
    });
</script>
```
