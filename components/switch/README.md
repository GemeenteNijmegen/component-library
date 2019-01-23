## Select

Based on a11y styled form components:<br>
https://github.com/scottaohara/a11y_styled_form_controls

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

### Notes

* The given label text should be descriptive enough for users using screen readers to understand what ticked/unticked (true/false) means.