---
title: How to start using components from the library
status: ready # draft, ready
---

In order to start using components from this library, you need to start with the following HTML template

```html
<!doctype html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <!-- Material Design Bootstrap combined with  custom styles -->
    <link rel="stylesheet" href="/css/main.css">

    <title>Title of the page</title>
</head>
<body>

<!-- START template component(s) -->
<!-- ... -->
<!-- END template component(s) -->

<!-- SCRIPTS -->
<!-- JQuery -->
<script type="text/javascript" src="/js/jquery-3.1.1.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="/js/tether.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="/js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script type="text/javascript" src="/js/mdb.min.js"></script>
</body>
</html>
```

When you have above in place, you can start filling the blank spot between the *template component(s)*
HTML comments.
If you want to start with a grid for instance, you can have a look here [MDB Grid](https://mdbootstrap.com/css/layout-grid/) and use one of the examples there to use in your own template.

On the left-side you see all the components which are marked to be used by Nijmegen based on the 
components from the [MDB framework](https://mdbootstrap.com/) and styled specific for Nijmegen
to create a consistent look-and-feel.
By selecting a component you will see a preview window which will show the component's look-and-feel.
Underneath the component preview you'll see the *HTML tab* in which you can copy the markup needed
to use in your own template.
There are some components which have some complementary documentation which can be seen in the *Notes tab*, for instance: [carousel]({{ componentPath '@carousel' }}), [listing]({{ componentPath '@listing' }}) or [select]({{ componentPath '@select' }}) etc.