## Inline skiplink

The `inline-skiplink` element is optional and can be used by keyboard users to skip over long lists of links (for example the search results facets).

If the item that is skipped to is not focusable; add `tabindex="-1"` to that element, for example:

```html
<section id="main-content" aria-label="Main content" tabindex="-1">
    ...
</section>
```

### Usage

Please use the inline skiplink sparingly. If you need to use more that one inline skiplink on a page it is often better to see if you can split the page into multiple pages or redesign the page so the skiplink is not needed anymore.

The inline skiplink is intended to be used in the middle of a page. If you want to provide users with a way to skip over the primary menu to the main content use the [navbar skiplink]({{ componentPath '@navbar-skiplink' }}) instead.
