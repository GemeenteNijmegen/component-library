## Responsive table
This is a custom component, based on this [demo](https://css-tricks.com/examples/ResponsiveTables/responsive.php).

### Using responsive tables in HTML
To use the responsive tables we need a little bit of js to make it work properly on mobile.
```javascript
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
```
