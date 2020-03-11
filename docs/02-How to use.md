---
title: How to start using components from the library
status: ready # draft, ready
---

## Conditions

To maintain a consistent look-and-feel of the implementation, it's needed to link to the correct styling and interaction libraries.<br>
It's the library's responsibility to provide these files and the implementors responsibility to use them.<br>
In the next section you can see an example of the minimum setup to get your started.

## Start your implementation

You can start with the following HTML output as a template which gives you the 
basic markup needed and all the proper references to styling and interactivity in order to start using components from this library.

All files (CSS and JavaScript) used in underneath example originate from the MDB framework and are therefor needed to kick-start your implementation.

```html
<!doctype html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- Start: Core styling -->
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="%HOST%{{ assetPath '/css/bootstrap.min.css' }}">
    <!-- Material Design Bootstrap combined with custom Nijmegen styles -->
    <link rel="stylesheet" href="%HOST%{{ assetPath '/nijmegen.css' }}">
    <!-- End: Core styling -->

    <title>Titel van de pagina</title>
</head>
<body>

<main>
    <!-- START: template component(s) -->
    <!-- ... -->
    <!-- END: template component(s) -->
</main>

<!-- Start: Core scripts -->
<!-- JQuery -->
<script src="%HOST%{{ assetPath '/js/jquery.min.js' }}"></script>
<!-- Bootstrap tooltips -->
<script src="%HOST%{{ assetPath '/js/popper.min.js' }}"></script>
<!-- Bootstrap core JavaScript -->
<script src="%HOST%{{ assetPath '/js/bootstrap.min.js' }}"></script>
<!-- MDB core JavaScript -->
<script src="%HOST%{{ assetPath '/js/mdb.min.js' }}"></script>
<!-- Nijmegen specific script -->
<script src="%HOST%{{ assetPath '/nijmegen.js' }}"></script>

<!-- Start: Additional component(s) script -->
<!-- ... -->
<!-- End: Additional component(s) script -->
</body>
</html>
```

### Adding component(s)

When you have above in place, you can start filling the blank spot between the *template component(s)*
HTML comments.
If you want to start with a grid for instance, you can have a look here [MDB Grid]({{ mdbootstrapPath '/layout/layout-grid/' }}) and use one of the examples there to use in your own template.

By selecting a component you will see a preview window which will show the component's look-and-feel.
Underneath the component preview you'll see the *HTML tab* in which you can copy the markup needed
to use in your own template.

There are some components which have some complementary documentation which can be seen in the *Notes tab*, for instance: [carousel]({{ componentPath '@carousel' }}), [listing]({{ componentPath '@listing' }}) or [select]({{ componentPath '@select' }}) etc.

Several components (like: [carousel]({{ componentPath '@carousel' }}), [date picker]({{ componentPath '@date-picker' }}) or [tooltips]({{ componentPath '@tooltips' }})) specify additional JavaScript needed for the implementation. As seen in above example, the place to add additional JavaScript is just before the closing `body` tag and after the core scripts.


## Templates

The component library has a few example templates which are listed here:

* [Default template]({{ componentPath '@default-template' }})<br>
  (*sticky navbar with smooth scroll anchors, responsive 3 column cards grid, horizontal collapse button which shows on mobile screens, responsive footer*)
* [Form inputs template]({{ componentPath '@forminputs-template' }})<br>
  (*sticky navbar, various form inputs, responsive footer*)
* [Example search results template]({{ componentPath '@searchresults-template' }})<br>
  (*sticky navbar, search results layout based on predefined example "paspoort" search term, responsive footer*)

## Preview components

The [preview page](../components-listing.html) lists all components so that they can easily be viewed.

## Inform us for using the library

Please inform us when you started using the component library by sending an email to [webmaster@irvn.nl](mailto:webmaster@irvn.nl). This way we are able to inform you as implementor about new developments regarding the library. We will not email you frequently and your emailaddress will only be used for the sole purpose of library developments.

<script>
    document.body.innerHTML = document.body.innerHTML.replace(/%HOST%/g, window.location.origin);
</script>
