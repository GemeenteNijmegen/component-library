function Carousel() {
    this.$carousel = null;
}

Carousel.prototype.init = function(element, options) {
    this.$carousel = $(element);
    const currentOptions = options ? options : { interval: 2000, pause: false };
    this.$carousel.carousel(currentOptions);

    $('li[data-target="#carousel-example"]').each(function() {
        $(this).attr('tabindex', '0');
    });

    $('.carousel-indicators li').on('keypress', function(event) {
        if (event.key == 'Enter') {
            $(this).trigger('click');
            $('.carousel-play-pause .carousel-control-pause').trigger('click');
        }
    });

    $('.carousel-control-play', this.$carousel).on('click', this.play.bind(this));
    $('.carousel-control-pause', this.$carousel).on('click', this.pause.bind(this));

    $('.carousel-control-prev', this.$carousel).on('click', this.pause.bind(this));
    $('.carousel-control-next', this.$carousel).on('click', this.pause.bind(this));
};

Carousel.prototype.play = function() {
    this.$carousel.carousel('cycle');
    $('.carousel-control-play', this.$carousel)
        .hide()
        .attr('aria-hidden', 'true');
    $('.carousel-control-pause', this.$carousel)
        .show()
        .attr('aria-hidden', 'false');
};

Carousel.prototype.pause = function() {
    this.$carousel.carousel('pause');
    $('.carousel-control-pause', this.$carousel)
        .hide()
        .attr('aria-hidden', 'true');
    $('.carousel-control-play', this.$carousel)
        .show()
        .attr('aria-hidden', 'false');
};

export default Carousel;
