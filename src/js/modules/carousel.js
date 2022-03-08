function Carousel() {
    this.$carousel = null;
}

Carousel.prototype.init = function(element, options) {
    this.$carousel = $(element);
    const currentOptions = options ? options : { interval: 2000, pause: false };
    this.$carousel.carousel(currentOptions);
    var carousel = this.$carousel;

    $('.carousel-indicators li').on('keypress', function(event) {
        const enterEvent = 13;

        if (event.which == enterEvent) {
            const targetIndex = event.target.getAttribute('data-slide-to');
            carousel.carousel(Number(targetIndex));
        }
    });
    $('.carousel-control-play', this.$carousel).click(this.play.bind(this));
    $('.carousel-control-pause', this.$carousel).click(this.pause.bind(this));
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
