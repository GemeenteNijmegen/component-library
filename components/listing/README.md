## Listing

This is a custom component which mainly consists of a title and content wrapped in an anchor
so the full element is clickable.

### Using the listing-item in HTML

If you only need one item, a copy-paste from the HTML tab would suffice.

### Using the listing-item in a grid

Let's say you want to create a grid type of listing with multiple items in it,
see below for an example HTML markup.
On mobile the items are stacked underneath eachother and on a tablet view and wider (*see* [MDB Grid options](https://mdbootstrap.com/css/layout-grid/#grid-options)) you will see 2 items next
to eachother per row.

```html
<div class="container">
    <ul class="row">
        <li class="col-12 col-md-6">
            <a href="#" class="listing-item">
                <p class="title">Dapibus ac facilisis in</p>
                <p>Lorem ipsum Morbi leo risus</p>
            </a>
        </li>
        <li class="col-12 col-md-6">
            <a href="#" class="listing-item">
                <p class="title">Dapibus ac facilisis in</p>
                <p>Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus</p>
            </a>
        </li>
        <li class="col-12 col-md-6">
            <a href="#" class="listing-item">
                <p class="title">Dapibus ac facilisis in</p>
                <p>Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus Lorem ipsum Morbi leo risus</p>
            </a>
        </li>
        <li class="col-12 col-md-6">
            <a href="#" class="listing-item">
                <p class="title">Dapibus ac facilisis in</p>
                <p>Lorem ipsum Morbi leo risus</p>
            </a>
        </li>
    </ul>
</div>
```
