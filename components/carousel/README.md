## Carousel

Based on the version from MDB (https://mdbootstrap.com/legacy/4.3.2/?page=javascript/carousel)

### Using the carousel element in HTML

For the play/pause functionality you need a little custom javascript to make it work
```javascript
<script>
    // Set the carousel options
    var carouselElm = $('.carousel');
    carouselElm.carousel({
        interval: 2000
    });
    
    // The custom javascript for the play/pause functionality
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
