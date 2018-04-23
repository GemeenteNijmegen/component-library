## Default Template

A custom template created for Nijmegen to showcase various components from this library in one overall view.

### Using

#### Smooth scroll
By adding the `smooth-scroll` class to the list container in the navbar component, you're able to use the
Smooth Scroll interaction as documented in MDB ({{ mdbootstrapPath '/javascript/smooth-scroll/#smooth-scroll' }})

```html
<ul class="navbar-nav mr-auto smooth-scroll">
```

Aside from this addition, the anchor(s) in the list container should have an href like `#section-1` whereas an element
with an `id="section-1"` should be present in the page thus allowing the Smooth Scroll interaction to scroll
nicely to the corresponding section.

#### Displaying the cards in a grid

Let's say you want to create a grid type of listing with multiple cards in it.<br>
On _extra small_, _small_ and _medium_ the items are stacked underneath eachother and on a _large_ view and wider (**≥ 992px**, *see* [MDB Grid options]({{ mdbootstrapPath '/layout/layout-grid/#grid-options' }})) you will see 3 items next to eachother per row.

#### Button horizontal collapse
This element is shown when viewed on devices smaller than a tablet.

### Notes

* Used components: see the "References" in the component library info tab