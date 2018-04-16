## Carousel

Based on the version from MDB:<br>
https://mdbootstrap.com/legacy/4.3.2/?page=javascript/carousel#basic-example

With custom play/pause addition.

### Accessibility

Regarding the `alt` attribute on the images, please follow the decision tree as can be seen here https://www.w3.org/WAI/tutorials/images/decision-tree/

### Using

To start using this component, some JavaScript is needed to initialize it.<br>
Underneath a jQuery example with the play/pause addition and should be placed in the `Additional component(s) script` section as documented in [How to use](/docs/how-to-use).

```javascript
<script>
    // Set the carousel options
    var carouselElm = $('.carousel');
    carouselElm.carousel({
        interval: 2000
    });
    
    // Custom JavaScript for the play/pause functionality
    $('.carousel-play-pause').on('click', 'button', function() {
        $(this).hide();
        if (this.classList.contains('carousel-control-play')) {
            carouselElm.carousel('cycle');
            this.setAttribute('aria-hidden', 'true');
            $(this).parent().find('.carousel-control-pause')
                .attr('aria-hidden', 'false')
                .show();
        } else {
            carouselElm.carousel('pause');
            this.setAttribute('aria-hidden', 'true');
            $(this).parent().find('.carousel-control-play')
                .attr('aria-hidden', 'false')
                .show();
        }
    });
</script>
```

### Notes

* MDB carousel by default starts sliding through the available slides, therefor a play/pause functionality has been added on top of the component to comply to the first bullet point in *"What makes a carousel accessible"* (https://www.w3.org/WAI/tutorials/carousels/)