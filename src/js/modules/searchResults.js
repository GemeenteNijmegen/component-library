function SearchResults() {
    this.resultItemTemplate = null;
    this.resultItemMeta = null;
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

    for (const result of results) {
        const $resultItem = $(this.resultItemTemplate).clone();
        
        $('.search-results__item-link', $resultItem).attr('href', result.url);
        $('.search-results__item-title', $resultItem).html(result.title);
        $('.search-results__item-body', $resultItem).html(result.body);
        
        const hasMeta = !!result.meta && result.meta.length;

        if(!hasMeta){
            this.searchResultsList.append($resultItem);
            $('.search-results__item-meta', $resultItem).hide();
            continue;
        }
        
        
        for(const metaItem of result.meta) {            
            const icon = document.createElement('span');
            icon.className = `mdi ${metaItem.icon.name}`;

            const screenReaderLabel = document.createElement('span');
            screenReaderLabel.className = 'sr-only';
            screenReaderLabel.innerHTML = metaItem.icon.label;
            icon.append(screenReaderLabel);

            const metaItemLi = document.createElement('li');

            if(!metaItem.link){
                $(metaItemLi).append(icon).append(metaItem.text);
                $('.search-results__item-meta', $resultItem).append(metaItemLi);
                continue;
            }

            const link = document.createElement('a'); 
            link.href = metaItem.link;
            link.target = '_blank'
            $(link).append(icon).append(metaItem.text);
            $(metaItemLi).append(link);            
            
            $('.search-results__item-meta', $resultItem).append(metaItemLi);
        }

        this.searchResultsList.append($resultItem);
    }
};

export default SearchResults;
