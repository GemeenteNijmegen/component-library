---
title: NL Design System
status: draft # draft, ready
---

## Intro
Lorem ipsum

## Why
Lorem ipsum

## How to use
We encourage you to use the NLDS components instead of the MD Bootstrap components. Not all components are allready available in NLD and our MD Bootstrap components have active implementatations so you can use both design components side by side. You can start your implementation by loading the following files.

| Type       | Url                                            | Integrity hash                              |
| ---------- | ---------------------------------------------- | ------------------------------------------- |
| stylesheet     | %HOST%{{ assetPath '/nijmegen-nlds.min.css' }}           | {{{ sri '/public/nijmegen-nlds.min.css' }}}           |

The Nijmegen NLDS components styles will only be applied inside the `nijmegen-theme` class, for example the button:
```html
<div class="nijmegen-theme">
      <button class="utrecht-button" type="button">Button</button>
</div>
```

Best practice to use the NLDS Nijmegen theme is to apply the `nijmegen-theme` class on the body element as stated in the example below.

### Example use NLDS and MD Bootstrap components
```html
<!doctype html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    
    <!-- Preload fonts and external styles -->
    <link rel="preload" 
          as="style"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,700&display=swap">
    <link rel="preconnect" 
          href="https://fonts.gstatic.com/" 
          crossorigin="anonymous">
    {{#each (preloadFiles) as |file| }}
    <link rel="preload" 
          as="{{file.as}}" 
          href="%HOST%{{ assetPath file.url }}" 
          type="{{file.as}}/{{file.type}}"
          crossorigin="anonymous">
    {{/each}}

    <!-- Start: Core styling -->
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" 
          href="%HOST%{{ assetPath '/css/bootstrap.min.css' }}"
          integrity="{{{ sri '/public/css/bootstrap.min.css' }}}"
          crossorigin="anonymous">
    <!-- Material Design Bootstrap combined with custom Nijmegen styles -->
    <link rel="stylesheet" 
          href="%HOST%{{ assetPath '/nijmegen.css' }}"
          integrity="{{{ sri '/public/nijmegen.css' }}}"
          crossorigin="anonymous">
    <!-- End: Core styling -->

    <!-- Start: NLDS styling -->
    <link rel="stylesheet" 
        href="%HOST%{{ assetPath '/nijmegen-nlds.min.css' }}"
        integrity="{{{ sri '/public/nijmegen-nlds.min.css' }}}"
        crossorigin="anonymous">
    <!-- End: NLDS styling -->

    <title>Titel van de pagina</title>
</head>
<body class="nijmegen-theme">

<main>
    <!-- START: MD Bootstrap component(s) -->
        <!-- ... -->
    <!-- END: MD Bootstrap component(s) -->
    
    <!-- START: NLDS Nijmegen theme -->
    <!-- ... -->
    <!-- END: NLDS Nijmegen theme -->
</main>

<!-- Start: Core scripts -->

<!-- JQuery -->
<script src="%HOST%{{ assetPath '/js/jquery.min.js' }}"
        integrity="{{{ sri '/public/js/jquery.min.js' }}}"
        crossorigin="anonymous"></script>

<!-- Bootstrap tooltips -->
<script src="%HOST%{{ assetPath '/js/popper.min.js' }}"
        integrity="{{{ sri '/public/js/popper.min.js' }}}"
        crossorigin="anonymous"></script>

<!-- Bootstrap core JavaScript -->
<script src="%HOST%{{ assetPath '/js/bootstrap.min.js' }}"
        integrity="{{{ sri '/public/js/bootstrap.min.js' }}}"
        crossorigin="anonymous"></script>

<!-- MDB core JavaScript -->
<script src="%HOST%{{ assetPath '/js/mdb.min.js' }}"
        integrity="{{{ sri '/public/js/mdb.min.js' }}}"
        crossorigin="anonymous"></script>

<!-- Nijmegen specific script -->
<script src="%HOST%{{ assetPath '/nijmegen.js' }}"
        integrity="{{{ sri '/public/nijmegen.js' }}}"
        crossorigin="anonymous"></script>
        
<!-- End: Core scripts -->
<!-- Start: Additional component(s) script -->
<!-- ... -->
<!-- End: Additional component(s) script -->
</body>
</html>
```

## Roadmap
The development and implementation of NLDS components is active at the moment. The current progress can be found in the [corresponding Github project](https://github.com/orgs/GemeenteNijmegen/projects/10). In the long termn the NLDS components will replace all MD Bootstrap components.

<script>
    var docElement = document.querySelector('.Document');
    docElement.innerHTML = docElement.innerHTML.replace(/%HOST%/g, window.location.origin);
</script>