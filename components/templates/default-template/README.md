## Default template

### Smooth scroll
By adding the `smooth-scroll` class to the list container in the navbar component, you're able to use the
Smooth Scroll interaction as documented in MDB (https://mdbootstrap.com/legacy/4.3.2/?page=javascript/smooth-scroll)

```html
<ul class="navbar-nav mr-auto smooth-scroll">
```

Aside from this addition, the anchor(s) in the list container should have an href like `#section-1` whereas an element
with an `id="section-1"` should be present in the page thus allowing the Smooth Scroll interaction to scroll
nicely to the corresponding section.


### Button horizontal collapse
This element is shown when viewed on devices smaller than a tablet. So any mobile phone will do.
