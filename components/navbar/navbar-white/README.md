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

#### Mobile search
For using the search in the navbar on a mobile device you need to include the following script:

```html
{{ render '@navbar-search-scripts' }}
```

#### In-page anchors
When using the navbar in a one-page application, mobile users will slideout the menu and click on an anchor and navigate to the corresponding section yet leaving the menu open.
To handle this use-case, put underneath JavaScript just before the closing "body" tag and the menu will close when navigating to the in-page section.

```html
{{ render '@navbar-scripts' }}
```

#### Autocomplete search
For the autocomplete search a real-time feed is provided by Pandosearch. This uses a combination of search suggestions and direct hits. To use this search functionality, JavaScript code is required before the closing "body" tag.

* [Autocomplete component script]({{ componentPath '@autocomplete' }})

```html
{{ render '@autocomplete-scripts' }}
```

* Pandosearch integration

```html
{{ render '@autocomplete-pandosearch-scripts' }}
```

### Notes

* Nijmegen has a collaboration with Pandosearch (https://www.pandosearch.com) for the search and search results implementation, as can be read in the `Using` section here. For an example of the search results, have a look at the [search results template]({{ componentPath '@searchresults-template' }}).
