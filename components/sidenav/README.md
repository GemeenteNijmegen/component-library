## Sidenav - Do not implement!

Based on the version from MDB:<br>
{{ mdbootstrapPath '/javascript/sidenav/' }}

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ docPath '/docs/how-to-use' }}).

```javascript
<script>
    // SideNav button initialization
    $(".button-collapse").sideNav();
    // SideNav scrollbar initialization
    var sideNavScrollbar = $('.side-nav .custom-scrollbar').get(0);
    Ps.initialize(sideNavScrollbar);
</script>
```

### Notes

* The sidenav and the trigger are connected by specifying a `data-activates` attribute on the trigger and a corresponding `id` on the sidenav element
