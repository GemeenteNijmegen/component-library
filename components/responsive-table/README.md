## Responsive Table

A custom component created for Nijmegen, based on this [CSS-Tricks demo](https://css-tricks.com/examples/ResponsiveTables/responsive.php).

### Using

To start using this component and facilitate a correct layout on mobile devices, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use' }}).

```javascript
<script>
    $('.responsive-table').each(function() {
        var headings = $(this).find('thead th').map(function() {
            return this.textContent;
        }).toArray();

        if (headings.length > 0) {
            $(this).find('tbody td').each(function(tdIdx) {
                this.setAttribute('data-title', headings[tdIdx % headings.length]);
            });
        }
    });
</script>
```
