let facetCounter = 0;

function Facets() {
    this.$facets = null;
    this.$facetsContainer = null;
    this.facetGroupTemplate = null;
    this.facetItemTemplate = null;
    this.globalCallback = null;
    this.allowCollapseOnDesktop = false;
    this.id = `facet-${++facetCounter}`;
}

Facets.prototype.init = function(selector, globalCallback, allowCollapseOnDesktop = false) {
    this.$facets = $(selector);
    this.$facetsContainer = $('.facets__facets', this.$facets);

    this.globalCallback = globalCallback;
    this.facetGroupTemplate = $.parseHTML($('#facets-group-template').html());
    this.facetItemTemplate = $.parseHTML($('#facets-item-template').html());
    this.allowCollapseOnDesktop = allowCollapseOnDesktop;

    if (this.allowCollapseOnDesktop) {
        $('.facets__title', this.$facets).addClass('allow-collapse-on-desktop');
        $('.facets__facets', this.$facets).addClass('allow-collapse-on-desktop');
    }

    this.$facetsContainer.addClass('hide');

    $('.facets__title', this.$facets)
        .on('click', this.clickHandler.bind(this))
        .attr('aria-controls', `${this.id}-facets`)
        .attr('aria-expanded', false);
    $('.facets__facets', this.$facets)
        .on('keyup', this.clickHandler.bind(this))
        .attr('role', 'region')
        .attr('tabindex', '-1')
        .attr('id', `${this.id}-facets`);
};

Facets.prototype.clickHandler = function (event) {
    if (event.type === 'keyup' && event.key !== 'Escape') {
        return;
    }
    var $title = $('.facets__title', this.$facets);
    if ($title.hasClass('expanded')) {
        $title
            .removeClass('expanded')
            .attr('aria-expanded', false)
            .trigger('focus');
        this.$facetsContainer.removeClass('expanded');
    } else {
        $title
            .addClass('expanded')
            .attr('aria-expanded', true);
        this.$facetsContainer
            .addClass('expanded')
            .trigger('focus');
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
                $('.facets__link', $facetItem).on('click',
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
