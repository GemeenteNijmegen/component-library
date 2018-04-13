## Lightbox

Based on the version from MDB:<br>
https://mdbootstrap.com/legacy/4.3.2/?page=javascript/light-box

### Accessibility

Regarding the `alt` attribute on the images, please follow the decision tree as can be seen here https://www.w3.org/WAI/tutorials/images/decision-tree/

> Use the alt attribute to communicate the destination of the link or action taken.

This lightbox use-case follows the [Functional Images](https://www.w3.org/WAI/tutorials/images/functional/) guideline.

### Using

To start using this component, some JavaScript is needed to initialize it.

```javascript
<script>
    $("#mdb-lightbox-ui").load("{{ assetPath '/mdb-addons/mdb-lightbox-ui.html' }}");
</script>
```
