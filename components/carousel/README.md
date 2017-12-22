## Carousel

Based on the version from MDB (https://mdbootstrap.com/legacy/4.3.2/?page=javascript/carousel)

### Using the carousel element in HTML

For the play/pause functionality you need a little custom javascript to make it work
```javascript
<script>
    // Set the carousel options
    $('.carousel').carousel({
        interval: 2000
    })
    
    // The custom javascript for the play/pause functionality
    $('.carousel-play-pause').on('click', '> i', function() {
        if ($(this).hasClass("play")) {
            $('.carousel').carousel("cycle");
            $(this).hide();
            $(".pause").show();
        } else {
            $('.carousel').carousel("pause");
            $(this).hide();
            $(".play").show();
        }
    });
</script>
```
