## Navbar skiplink

The `navbar-skiplinks` element is optional and can be used by keyboard users to skip over the primary navigation directly to the content.

If the item that is skipped to is not focusable; add `tabindex="-1"` to that element, for example:

```html
<section id="main-content" aria-label="Main content" tabindex="-1">
    ...
</section>
```

### Implementation

Check for a full implementation example the HTML of the [navbar component]({{ componentPath '@navbar' }})
