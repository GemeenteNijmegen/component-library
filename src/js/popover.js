$('[data-toggle="popover"]')
    .popover({
        trigger: 'click',
        template: $('.popover-template').html(),
    })
    .keyup(function(event) {
        if (event.key == 'Escape') {
            $(this).popover('hide');
        }
    })
    .on('inserted.bs.popover', function() {
        var $popup = $(this);
        $('.popover:last-child .popover-close').click(function(e) {
            $popup.popover('hide');
        });
    });
