## Navbar

### Active menu item
To set an active menu item, underneath HTML markup for a navigation item can be used where a class "active" is added to the active menu item and as and extra addition regarding accessibility the "span" can be used.

```html
<li class="nav-item active">
    <a href="#" class="nav-link">Menu active <span class="sr-only">(current)</span></a>
</li>
```

### In-page anchors
When using the navbar in a one-page application, mobile users will slideout the menu and click on an anchor and navigate to the corresponding section yet leaving the menu open.
To handle this usecase, put underneath JavaScript just before the closing "body" tag and the menu will close when navigating to the in-page section.

```javascript
<script>
    var navbarToggler = $('.navbar-toggler');
    // is the mobile nav active?
    if (navbarToggler.is(':visible')) {
        // act on in-page anchors
        window.addEventListener('hashchange', function() {
            // is the menu open?
            if (!navbarToggler.hasClass('collapsed')) {
                navbarToggler.trigger('click');
            }
        }, false);
    }
</script>
```