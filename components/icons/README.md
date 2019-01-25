## Icons (Material Design)

Nijmegen requested to add Material Design Icons (https://materialdesignicons.com) to this framework instead of the default that comes with the MDB framework.

In above preview panel, all icons available in this framework are displayed.

### Accessibility

When using an icon for decorative reason, be sure to add `aria-hidden="true"` to the icon to hide it for assistive technologies.<br>
(https://www.24a11y.com/2017/svg-icon-fonts-accessibility-case-study/)
<br /><br />
If the icons have a functional meaning, then please use `aria-label="Give a useful description in Dutch"`.
In the case of a link, the label would apply to the parent:
```html
<a href="/account" aria-label="Bekijk mijn account">
    <span class="mdi mdi-account" aria-hidden="true"></span>
</a>
```

### Using

No additional actions, aside from the markup, are needed to use these icons.
