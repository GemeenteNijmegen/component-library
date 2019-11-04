## Responsive Table

A custom component created for Nijmegen, based on this [CSS-Tricks demo](https://css-tricks.com/examples/ResponsiveTables/responsive.php).

### Using

To start using this component and facilitate a correct layout on mobile devices, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```html
{{ render '@normal-table-scripts' }}
```

### Notes

- The caption element functions as a heading for the table. Captions help (screen-reader) users to find a table and understand what it's about.
- If the table is hard to interpret it can help to add a summary in the caption as wel.
- If the caption is not wanted visually you can hide this by applying the class `sr-only`. It is also possible to hide only the summary.
