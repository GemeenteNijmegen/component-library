## Alerts - Do not implement!

Modals are used instead of alerts.

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/alerts/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.
Underneath a jQuery example which reads the `toast-type` and `toast-text` data attributes on the element to be used for the `toastr/alert` and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```javascript
<script>
    $('[data-toast-type]').click(function() {
        var toastrType = $(this).data('toast-type');
        var toastrText = $(this).data('toast-text');
        toastr[toastrType](toastrText, '', {
            closeButton: true,
            timeOut: 0,
            extendedTimeOut: 0
        });
    });
</script>
```
