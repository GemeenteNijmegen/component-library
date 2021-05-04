function FacetsAdvanced() {
    this.$facets = null;
    this.$facetsContainer = null;
    this.facetGroupTemplate = null;
    this.facetItemTemplate = null;
    this.globalCallback = null;

    this.Facets = new nijmegen.Facets();
}

FacetsAdvanced.prototype.init = function (selector, globalCallback, allowCollapseOnDesktop = false) {
    this.Facets.init(selector, globalCallback, allowCollapseOnDesktop);

    this.$facets = $(selector);
    this.$facetsContainer = $('.facets__facets', this.$facets);

    this.globalCallback = globalCallback;
    this.facetGroupTemplate = $.parseHTML($('#facets-advanced-group-template').html());
    this.facetItemTemplate = $.parseHTML($('#facets-advanced-item-template').html());
    this.facetItemCheckboxTemplate = $.parseHTML($('#facets-advanced-item-checkbox-template').html());

};

FacetsAdvanced.prototype.createGroup = function(facetGroup, id) {
    var $facetGroup = $(this.facetGroupTemplate).clone();
    if (facetGroup.expanded) {
        $facetGroup.addClass('expanded');
    }
    $('.facets__group-title', $facetGroup).html(facetGroup.title);
    $('.facets__group-button', $facetGroup)
        .on('click', function() {
            var $facetGroup = $(this).parent();
            if ($facetGroup.hasClass('expanded')) {
                $facetGroup.removeClass('expanded');
                $(this).attr('aria-expanded', 'false');
            } else {
                $facetGroup.addClass('expanded');
                $(this).attr('aria-expanded', 'true');
            }
        })
        .attr('aria-expanded', facetGroup.expanded ? 'true' : 'false')
        .attr('aria-controls', 'facet-group-list-' + id);

    $('.facets__list', $facetGroup).attr('id', 'facet-group-list-' + id);
    return $facetGroup;
};

FacetsAdvanced.prototype.createItem = function(facetItem) {
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
    return $facetItem;
};

FacetsAdvanced.prototype.createItemCheckbox = function(facetItem, id) {
    var $facetItem = $(this.facetItemCheckboxTemplate).clone();
    var namedId = facetItem.id ? facetItem.id : 'facet-item-checkbox-' + id;
    var callback = facetItem.callback ? facetItem.callback : this.globalCallback;
    $('.facets__checkbox', $facetItem)
        .attr('id', namedId)
        .on('change',
            (function($facetItem, facetItem) {
                return function(event) {
                    callback(event, $facetItem, facetItem);
                };
            })($facetItem, facetItem)
        );
    if (facetItem.active) {
        $('.facets__checkbox', $facetItem).prop('checked', true);
    }
    $('.facets__label', $facetItem)
        .html(facetItem.title)
        .attr('for', namedId);
    return $facetItem;
};

FacetsAdvanced.prototype.show = function (facets) {
    this.$facetsContainer.html('');
    if (facets && facets.length) {
        this.$facets.removeClass('facets--hide');
    } else {
        this.$facets.addClass('facets--hide');
    }
    for (var groupKey in facets) {
        var facetGroup = facets[groupKey];
        var $facetGroup = this.createGroup(facetGroup, groupKey);

        for (var itemKey in facetGroup.facets) {
            var facetItem = facetGroup.facets[itemKey];
            var $facetItem = null;
            if (facetItem.type == 'checkbox') {
                $facetItem = this.createItemCheckbox(facetItem, itemKey);
            } else {
                $facetItem = this.createItem(facetItem, itemKey);
            }

            $('.facets__list', $facetGroup).append($facetItem);
        }

        this.$facetsContainer.append($facetGroup);
    }
};

export default FacetsAdvanced;
