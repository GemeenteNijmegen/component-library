## Responsive Table

A custom component created for Nijmegen, based on this [CSS-Tricks demo](https://css-tricks.com/examples/ResponsiveTables/responsive.php).

### Using

To start using this component and facilitate a correct layout on mobile devices, some JavaScript is needed to initialize it.
Underneath a jQuery snippet which provides this functionality.

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
