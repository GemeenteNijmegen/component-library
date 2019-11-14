function Pandosearch(itemsPerPage) {
    this.baseSearchUrl = 'https://public.pandosearch.com/nijmegen.nl/search';
    this.searchUrl = null;
    this.searchParams = {
        page: 1,
        facetName: null,
        facetValue: null,
    };
    this.query = null;
    this.rawResults = null;
    this.itemsPerPage = itemsPerPage ? itemsPerPage : 5;
    this.totalHits = 0;
    this.searchResultsComponent = new nijmegen.SearchResults();
    this.$searchResultsContainer = $('#searchresults');
    this.$loadingContainer = $('#loading');
    this.$paginationContainer = $('#pagination');
    this.facets = null;
    this.facetsComponent = new nijmegen.Facets();
    this.$facetsContainer = $('#facets');
    this.facetsTranslations = null;
}

Pandosearch.prototype.init = function(facetsTranslations, facetsSortingOrder) {
    this.facetsTranslations = facetsTranslations ? facetsTranslations : {};
    this.facetsSortingOrder = facetsSortingOrder ? facetsSortingOrder : {};

    this.searchResultsComponent.init();
    this.facetsComponent.init(this.$facetsContainer, function() {
        $('.facets__title').click();
    });

    this.toggleLoadingContainer(true);
};

Pandosearch.prototype.showHits = function() {
    this.searchParams = this.getParamsFromHash();
    this.buildSearchUrl();

    $.get(this.searchUrl, this.showHitsResult.bind(this));
};

Pandosearch.prototype.showFacets = function() {
    this.buildSearchUrl();

    $.get(this.searchUrl, this.showFacetsResult.bind(this));
};

Pandosearch.prototype.buildSearchUrl = function() {
    this.query = this.getUrlParameterByName('q');

    this.searchUrl =
        this.baseSearchUrl +
        '?size=' +
        this.itemsPerPage +
        '&page=' +
        this.searchParams.page +
        (this.searchParams.facetName && this.searchParams.facetValue
            ? '&facets[' + this.searchParams.facetName + ']=' + this.searchParams.facetValue
            : '') +
        '&q=' +
        this.query;
};

Pandosearch.prototype.showHitsResult = function(rawResults) {
    this.rawResults = rawResults;
    var hits = this.getHits();

    var didYouMeanTerm;
    if (!hits.length) {
        didYouMeanTerm = this.getDidYouMeanTerm();
        hits = didYouMeanTerm ? this.getDidYouMeanHits() : [];
    }
    this.searchResultsComponent.show(hits, this.query, didYouMeanTerm);

    if (hits.length) {
        var paginationUrl =
            '?q=' +
            this.query +
            this.buildHashUrlQuery('{page}', this.searchParams.facetName, this.searchParams.facetValue);

        var pagination = new nijmegen.Pagination(this.getNumberOfPages(), paginationUrl, 5);
        pagination.init(this.$paginationContainer);
        pagination.show(parseInt(this.searchParams.page));
    } else {
        this.$paginationContainer.hide();
    }

    this.selectCurrentFacet();
    this.toggleLoadingContainer(false);
};

Pandosearch.prototype.showFacetsResult = function(rawResults) {
    this.rawResults = rawResults;

    this.facets = this.getFacets();
    this.facetsComponent.show(this.facets);
};

Pandosearch.prototype.getHits = function() {
    this.totalHits = this.rawResults.total;
    return Array.isArray(this.rawResults.hits)
        ? this.rawResults.hits.map(function(hit) {
              return {
                  title: hit.fields.title ? hit.fields.title : '---',
                  body: hit.fields.description ? hit.fields.description : hit.fields.body ? hit.fields.body : '---',
                  url: hit.url,
              };
          })
        : [];
};

Pandosearch.prototype.getDidYouMeanTerm = function() {
    return this.rawResults.suggestions ? this.rawResults.suggestions.didyoumean.text : null;
};

Pandosearch.prototype.getDidYouMeanHits = function() {
    this.totalHits = this.rawResults.suggestions.didyoumean.result.total;
    return Array.isArray(this.rawResults.suggestions.didyoumean.result.hits)
        ? this.rawResults.suggestions.didyoumean.result.hits.map(function(hit) {
              return {
                  title: hit.fields.title ? hit.fields.title : '---',
                  body: hit.fields.body ? hit.fields.body : '---',
                  url: hit.url,
              };
          })
        : [];
};

Pandosearch.prototype.getFacets = function() {
    var facets = [];
    var params = this.getParamsFromHash();
    for (var facetName in this.rawResults.facets) {
        var facetsByName = this.rawResults.facets[facetName]
            .map(function(facet) {
                return {
                    key: facet.key,
                    title: this.translateFacetName(facet.display) + ' (' + facet.count + ')',
                    url: '?q=' + this.query + this.buildHashUrlQuery(1, facetName, facet.key),
                    active: params.facetName === facetName && params.facetValue === facet.key,
                    sort:
                        this.facetsSortingOrder[facet.display] != undefined
                            ? this.facetsSortingOrder[facet.display]
                            : 0,
                };
            }, this)
            .sort(function(facet_1, facet_2) {
                return facet_1.sort - facet_2.sort;
            });
        if (facetsByName.length) {
            var facetData = {
                name: facetName,
                title: this.translateFacetName(facetName),
                facets: facetsByName,
            };

            facets.push(facetData);
        }
    }

    return facets;
};

Pandosearch.prototype.selectCurrentFacet = function() {
    for (var groupKey in this.facets) {
        var facetGroup = this.facets[groupKey];
        for (var itemKey in facetGroup.facets) {
            var facetItem = facetGroup.facets[itemKey];

            if (
                this.searchParams.facetName &&
                this.searchParams.facetValue &&
                facetGroup.name === this.searchParams.facetName &&
                facetItem.key === this.searchParams.facetValue
            ) {
                facetItem.url = '?q=' + this.query + '#page=1';
                facetItem.active = true;
            } else {
                facetItem.url = '?q=' + this.query + this.buildHashUrlQuery(1, facetGroup.name, facetItem.key);
                facetItem.active = false;
            }
        }
    }

    this.facetsComponent.show(this.facets);
};

Pandosearch.prototype.translateFacetName = function(facetName) {
    return this.facetsTranslations[facetName] ? this.facetsTranslations[facetName] : facetName;
};

Pandosearch.prototype.getNumberOfPages = function() {
    return Math.ceil(this.totalHits / this.itemsPerPage);
};

Pandosearch.prototype.getParamsFromHash = function() {
    var hash = window.location.hash.substr(1);
    if (!hash) {
        return this.searchParams;
    }

    return hash.split('&').reduce(function(result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});
};

Pandosearch.prototype.toggleLoadingContainer = function(loading) {
    if (loading) {
        this.$searchResultsContainer.hide();
        this.$loadingContainer.show();
    } else {
        this.$searchResultsContainer.show();
        this.$loadingContainer.hide();
    }
};

Pandosearch.prototype.buildHashUrlQuery = function(page, facetName, facetValue) {
    var hashQuery = '#page=' + page;
    if (facetName && facetValue) {
        hashQuery += '&facetName=' + facetName + '&facetValue=' + facetValue;
    }
    return hashQuery;
};

Pandosearch.prototype.getUrlParameterByName = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

export default Pandosearch;
