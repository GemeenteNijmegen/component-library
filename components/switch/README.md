## Select

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/material-select/#basic' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath is an example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```javascript
<script>
    var selector = '[data-check-switch]';
    var elList = document.querySelectorAll(selector);
    var i;
    for ( i = 0; i < elList.length; i++ ) {
        var a11ySwitch = new A11YswitchCheck();
        a11ySwitch.init( elList[i] );
    };
</script>
```
todo: yaml file, acc test, add to form elem page, complete readme, all 3 files...
### Notes

* MDB framework defines that the input element comes prior to the label element
