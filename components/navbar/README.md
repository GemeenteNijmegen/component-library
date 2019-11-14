## Navbar

Based on the fixed top version from MDB:<br>
{{ mdbootstrapPath '/components/navbar/#basic-example' }}

### Using

Aside from the markup, some extra actions are needed.

* Since the navbar is fixed top, it's advisable to add some padding (_with a minimum of 74 pixels_) to the `body` element to not risk having content under the navbar which should be visible by default.

#### Active menu item
To set an active menu item, underneath HTML markup for a navigation item can be used where a class `active` is added to the active menu item and as and extra addition regarding accessibility the "span" can be used.

```html
<li class="nav-item active">
    <a href="#" class="nav-link">Menu <span class="sr-only">(huidig)</span></a>
</li>
```

#### Close mobile menu when clicking outside or when navigate on the same page

Include the script below to enable automatic closing of the menu on a mobile when:

- A user clicks somewhere outside the menu
- A user clicks on a link in the menu that scrolls to content on the same page

When using the navbar to scroll to content on the same page make sure to add the class `smooth-scroll` to the `navbar-nav` element.

#### Autocomplete search

For the autocomplete search a real-time feed is provided by Pandosearch. This uses a combination of search suggestions and direct hits. To use this search functionality, JavaScript code is required before the closing "body" tag.

* Pandosearch integration

```html
{{ render '@autocomplete-pandosearch-scripts' }}
```

### Notes

* Nijmegen has a collaboration with Pandosearch (https://www.pandosearch.com) for the search and search results implementation, as can be read in the `Using` section here. For an example of the search results, have a look at the [search results template]({{ componentPath '@searchresults-template' }}).
