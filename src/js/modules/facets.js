function Facets() {
    this.$facets = null;
    this.$facetsContainer = null;
    this.facetGroupTemplate = null;
    this.facetItemTemplate = null;
    this.globalCallback = null;
}

Facets.prototype.init = function(selector, globalCallback) {
    this.$facets = $(selector);
    this.$facetsContainer = $('.facets__facets', this.$facets);

    this.globalCallback = globalCallback;
    this.facetGroupTemplate = $.parseHTML($('#facets-group-template').html());
    this.facetItemTemplate = $.parseHTML($('#facets-item-template').html());

    $('.facets__title', this.$facets).click(this.clickHandler.bind(this));
};

Facets.prototype.clickHandler = function() {
    var $title = $('.facets__title', this.$facets);
    if ($title.hasClass('expanded')) {
        $title.removeClass('expanded');
        this.$facetsContainer.removeClass('expanded');
    } else {
        $title.addClass('expanded');
        this.$facetsContainer.addClass('expanded');
    }
};

Facets.prototype.show = function(facets) {
    this.$facetsContainer.html('');
    if (facets && facets.length) {
        this.$facets.removeClass('facets--hide');
    } else {
        this.$facets.addClass('facets--hide');
    }
    for (var groupKey in facets) {
        var facetGroup = facets[groupKey];
        var $facetGroup = $(this.facetGroupTemplate).clone();
        $('.facets__group-title', $facetGroup).html(facetGroup.title);

        for (var itemKey in facetGroup.facets) {
            var facetItem = facetGroup.facets[itemKey];
            var $facetItem = $(this.facetItemTemplate).clone();

            $('.facets__link', $facetItem).html(facetItem.title);
            if (facetItem.url) {
                $('.facets__link', $facetItem).attr('href', facetItem.url);
            }
            if (facetItem.callback || this.globalCallback) {
                var callback = facetItem.callback ? facetItem.callback : this.globalCallback;
                $('.facets__link', $facetItem).click(
                    (function($facetItem, facetItem) {
                        return function(event) {
                            callback(event, $facetItem, facetItem);
                        };
                    })($facetItem, facetItem)
                );
            }
            if (facetItem.active) {
                $facetItem.addClass('active');
            }

            $('.facets__list', $facetGroup).append($facetItem);
        }

        this.$facetsContainer.append($facetGroup);
    }
};

export default Facets;
