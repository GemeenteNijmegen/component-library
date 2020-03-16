function SearchResults() {
    this.resultItemTemplate = null;
    this.searchResultsList = null;
}

SearchResults.prototype.init = function() {
    this.searchResultsList = $('#search-results');
    this.searchTermContainer = $('#search-term');
    this.noResultsContainer = $('#search-noresults');
    this.didYouMeanContainer = $('#search-didyoumean');
    this.didYouMeanTermContainer = $('#search-term-didyoumean');
    this.resultItemTemplate = $.parseHTML($('#search-results-item-template').html());
};

SearchResults.prototype.show = function(results, searchTerm, didYouMeanTerm) {
    this.searchResultsList.html('');
    this.searchTermContainer.text(searchTerm);

    if (!results.length || didYouMeanTerm) {
        this.noResultsContainer.show();
    }

    if (didYouMeanTerm) {
        this.didYouMeanTermContainer.text(didYouMeanTerm);
        this.didYouMeanContainer.show();
    }

    for (var key in results) {
        var resultItem = $(this.resultItemTemplate).clone();
        var result = results[key];
        $('.search-results__item-link', resultItem).attr('href', result.url);
        $('.search-results__item-title', resultItem).html(result.title);
        $('.search-results__item-body', resultItem).html(result.body);
        this.searchResultsList.append(resultItem);
    }
};

export default SearchResults;