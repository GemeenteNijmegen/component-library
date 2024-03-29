function Autocomplete() {
    this.$resultsList = null;
    this.resultItemTemplate = null;
    this.resultHeaderTemplate = null;
    this.getResults = null;
    this.currentItem = -1;
    this.numberOfItems = 0;
    this.searchTimeoutId = null;
    this.searchTimeout = 500;
    this.query = null;
    this.searching = false;
    this.searchResults = [];
    this.defaultSearchUrl = '';

    this.keyCodes = {
        RETURN: 13,
        ESC: 27,
        UP: 38,
        DOWN: 40,
        TAB: 9,
    };
}

Autocomplete.prototype.init = function(getResultsFn, defaultSearchUrl) {
    this.$resultsList = $('#autocomplete-results');
    this.resultItemTemplate = $.parseHTML($('#autocomplete-result-template').html());
    this.resultHeaderTemplate = $.parseHTML($('#autocomplete-section-header-template').html());
    this.getResults = getResultsFn;
    if (defaultSearchUrl) {
        this.defaultSearchUrl = defaultSearchUrl;
    }

    $(document).on('click', this.clickOutside.bind(this));

    $('#suggest-search-query').on('keydown keyup', this.inputKeyHandle.bind(this));
    $('#suggest-search-query').focus(this.inputFocusHandle.bind(this));

    $('.autocomplete .autocomplete__clear-button').click(
        function(event) {
            event.preventDefault();
            this.clearSearchField();
        }.bind(this)
    );

    $('.autocomplete .autocomplete__search-button').click(
        function(event) {
            event.preventDefault();
            $('#suggest-search-query').focus();
        }.bind(this)
    );
};

Autocomplete.prototype.clickOutside = function(event) {
    if (
        this.$resultsList.is(':visible') &&
        !$(event.target).closest('.autocomplete').length &&
        !$(event.target).closest('#navbar-open-search').length
    ) {
        this.closeResults(true);
    }
};

Autocomplete.prototype.closeResults = function(triggerClose) {
    this.$resultsList.html('');
    this.$resultsList.hide();
    this.$resultsList.removeAttr('role');
    $('#suggest-search-query').removeAttr('aria-activedescendant');
    if (triggerClose) {
        $('.autocomplete').trigger('close');
    }
};

Autocomplete.prototype.clearSearchField = function() {
    this.searchResults = [];
    this.query = null;
    $('#suggest-search-query').val('');
    $('#suggest-search-query').focus();
    $('#autocomplete-search-results-announcer').text('');
    this.setSearchIcon();
    this.closeResults();
};

Autocomplete.prototype.setSearchIcon = function() {
    if ($('#suggest-search-query').val() != '') {
        $('.autocomplete .autocomplete__search-button').addClass('autocomplete__button--hide');
        $('.autocomplete .autocomplete__clear-button').removeClass('autocomplete__button--hide');
    } else {
        $('.autocomplete .autocomplete__search-button').removeClass('autocomplete__button--hide');
        $('.autocomplete .autocomplete__clear-button').addClass('autocomplete__button--hide');
    }
};

Autocomplete.prototype.inputFocusHandle = function() {
    this.query = $('#suggest-search-query')
        .val()
        .trim();
    this.autocompleteSearch();
};

Autocomplete.prototype.show = function(results) {
    this.searchResults = results;
    this.$resultsList.html('');
    this.$resultsList.show();
    this.$resultsList.attr('role', 'listbox');
    this.numberOfItems = results.filter(function(result) {
        return !result.header;
    }).length;
    this.currentItem = -1;

    var resultsCount = results.filter(function(result) {
        return !result.header;
    }).length;

    if (resultsCount === 0) {
        this.closeResults();
        this.searching = false;
        return;
    }

    $('#autocomplete-search-results-announcer').text(
        this.query ? 'Er zijn ' + resultsCount + ' zoekresultaten gevonden voor de zoekterm: ' + this.query : ''
    );

    var itemNr = 0;
    var currentHeader = '';
    for (var key in results) {
        var result = results[key];
        if (result.header) {
            var resultHeader = $(this.resultHeaderTemplate).clone();
            resultHeader.text(result.header);
            this.$resultsList.append(resultHeader);
            currentHeader = result.header + ': ';
            continue;
        }
        var resultItem = $(this.resultItemTemplate).clone();
        $('.autocomplete__result-item-header', resultItem).text(currentHeader);
        $('.autocomplete__result-link', resultItem)
            .html(result.title)
            .attr('href', result.url)
            .attr('id', 'result-item-' + itemNr)
            .mouseenter(this.itemMouseHandle.bind(this))
            .prepend('<span class="sr-only">' + currentHeader + '</span>');
        itemNr++;
        if (result.class) {
            $('.autocomplete__result-link', resultItem).addClass(result.class);
        }
        this.$resultsList.append(resultItem);
    }

    this.searching = false;
};

Autocomplete.prototype.selectItem = function(scrollToElement) {
    $('.autocomplete__result-link', this.$resultsList)
        .removeClass('active')
        .removeAttr('aria-selected');

    if (this.currentItem < 0) {
        $('#suggest-search-query').attr('aria-activedescendant', '');
        return;
    }
    var selectedItem = $('#result-item-' + this.currentItem);
    selectedItem.addClass('active').attr('aria-selected', 'true');
    if (scrollToElement) {
        $(selectedItem)[0].scrollIntoView();
    }
    $('#suggest-search-query').attr('aria-activedescendant', 'result-item-' + this.currentItem);
};

Autocomplete.prototype.itemMouseHandle = function(event) {
    var id = event.target.id.replace('result-item-', '');
    this.currentItem = parseInt(id);
    this.selectItem();
};

Autocomplete.prototype.inputKeyHandle = function(event) {
    var key = event.which || event.keyCode;
    if (event.target.value == '') {
        this.clearSearchField();
    } else {
        this.setSearchIcon();
    }
    switch (key) {
        case this.keyCodes.DOWN:
            if (event.type === 'keyup') {
                break;
            }
            if (this.currentItem < this.numberOfItems - 1) {
                this.currentItem++;
                this.selectItem(true);
                event.preventDefault();
            }
            break;
        case this.keyCodes.UP:
            if (event.type === 'keyup') {
                break;
            }
            if (this.currentItem >= 0) {
                this.currentItem--;
                this.selectItem(true);
                event.preventDefault();
            }
            break;
        case this.keyCodes.RETURN:
            if (this.currentItem < 0 && (!this.defaultSearchUrl || !this.query)) {
                event.preventDefault();
                break;
            }
            var link = this.defaultSearchUrl.replace('{query}', this.query);
            if (this.currentItem >= 0) {
                link = $('#result-item-' + this.currentItem, this.$resultsList).attr('href');
            }
            window.location = link;
            event.preventDefault();
            break;
        case this.keyCodes.ESC:
            if (event.type === 'keyup') {
                break;
            }
            this.clearSearchField();
            break;
        default:
            this.query = event.target.value.trim();
            if (this.searching) {
                break;
            }
            if (this.searchTimeoutId) {
                clearTimeout(this.searchTimeoutId);
            }
            this.searchTimeoutId = setTimeout(this.autocompleteSearch.bind(this), this.searchTimeout);
    }
};

Autocomplete.prototype.autocompleteSearch = function() {
    if (this.query.length < 2) {
        this.show([]);
        return;
    }
    this.searching = true;
    this.getResults(this.query, this.show.bind(this));
};

export default Autocomplete;
