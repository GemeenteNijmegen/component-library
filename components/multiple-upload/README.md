## Multiple Upload

Based on a HTML5 file upload:<br>
https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath is an example on how to achieve this and should be placed in the `Additional component(s) script` section as documented in [How to use]({{ assetPath '/docs/how-to-use.html' }}).

```html
{{ render '@multiple-upload-scripts' }}
```

### Notes

* By adding an `accept` attribute to the input element such as: `accept="image/jpeg, image/jpg, .pdf"`, you can help indicate to the browser the allowed file types, although this may not necessarily replace your own validation.
* You should handle the file upload using your own script in a way specific to your own application
