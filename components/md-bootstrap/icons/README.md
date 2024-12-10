## Icons (Material Design)

Nijmegen requested to add Material Design Icons (https://materialdesignicons.com) to this framework instead of the default that comes with the MDB framework.

To view the full list of icons go the the material design icons website.

### Accessibility

When using an icon for decorative reason, be sure to add `aria-hidden="true"` to the icon to hide it for assistive technologies.<br>
(https://www.24a11y.com/2017/svg-icon-fonts-accessibility-case-study/)
<br /><br />
If the icons have a functional meaning, then you have to add a span with the class `sr-only` and a title attribute to describe the meaning of the icon:
```html
<a href="/account" title="Bekijk mijn account">
    <span class="sr-only">Bekijk mijn account</span>
    <span class="mdi mdi-account" aria-hidden="true"></span>
</a>
```

### Using

No additional actions, aside from the markup, are needed to use these icons.
