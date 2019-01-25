## Popovers

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/popovers/' }}

### Using

We discourage the use of this component since it is very difficult to use with assistive technology

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example which reads the `title`, `placement` and `content` data attributes on the element to be used for the `popover` and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```javascript
<script>
    $('[data-toggle="popover"]')
        .popover({
            trigger: 'click',
            template: $('.popover-template').html()
        })
        .keyup(function (event) {
            if (event.key == 'Escape') {
                $(this).popover('hide');
            }
        })
        .on('inserted.bs.popover', function () {
            var $popup = $(this);
            $('.popover:last-child .popover-close').click(function (e) {
                $popup.popover('hide');
            });
        })
</script>
```
