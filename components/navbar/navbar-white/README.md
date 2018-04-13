## Navbar

Based on the version from MDB:<br>
https://mdbootstrap.com/legacy/4.3.2/?page=components/navbars#basic-example

### Using

Aside from the markup, an extra JavaScript include is needed (_when the search is part of the component_) to have a fully functional component.

By adding underneath `script` tag after the other required `script` tags (as documented in [How to use](/docs/how-to-use)) and before the closing `body` tag, OpenIndex will connect a real-time autocomplete to the search input field.

```javascript
<script src="//www.openindex.io/js/openindex.69694b9315763c81.js"></script>
```

#### Active menu item
To set an active menu item, underneath HTML markup for a navigation item can be used where a class `active` is added to the active menu item and as and extra addition regarding accessibility the "span" can be used.

```html
<li class="nav-item active">
    <a href="#" class="nav-link">Menu active <span class="sr-only">(current)</span></a>
</li>
```

#### In-page anchors
When using the navbar in a one-page application, mobile users will slideout the menu and click on an anchor and navigate to the corresponding section yet leaving the menu open.
To handle this use-case, put underneath JavaScript just before the closing "body" tag and the menu will close when navigating to the in-page section.

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

### Notes

* Nijmegen has a collaboration with OpenIndex (https://www.openindex.io) for the search and search results implementation, as can be read in the `Using` section here. For an example of the search results, have a look at the [search results template]({{ componentPath '@searchresults-template' }}).