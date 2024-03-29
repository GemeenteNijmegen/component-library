function Pagination(numberOfPages, link, maxNumberOfPages) {
    this.maxNumberOfPages = maxNumberOfPages ? maxNumberOfPages : 9;
    this.numberOfPages = numberOfPages;
    this.paginateList = null;
    this.paginateItemTemplate = $.parseHTML($('#pagination-item-template').html());
    this.paginateItemCurrentTemplate = $('#pagination-item-current-template').html();
    this.link = link;
}

Pagination.prototype.init = function(selector) {
    this.paginateList = $(selector);
};

Pagination.prototype.show = function(currentPage) {
    $('.page-item:not(:first-child):not(:last-child)', this.paginateList).remove();

    var showPages = this.getPagesToShow(currentPage);

    for (var key in showPages) {
        var page = showPages[key];
        var paginateItem = $(this.paginateItemTemplate).clone();
        $('.page-link', paginateItem).text(page);
        $('.page-link', paginateItem).attr('href', this.link.replace('{page}', page));

        if (page === currentPage) {
            $(paginateItem).addClass('active');
            $('.page-link', paginateItem).append(this.paginateItemCurrentTemplate);
        }

        $('.page-item-next', this.paginateList).before(paginateItem);
    }

    if (this.numberOfPages === 1) {
        this.hideButton($('.page-item-previous', this.paginateList));
        this.hideButton($('.page-item-next', this.paginateList));
    } else if (currentPage === 1) {
        this.showButton($('.page-item-next', this.paginateList), currentPage + 1);
        this.hideButton($('.page-item-previous', this.paginateList));
    } else if (currentPage === this.numberOfPages) {
        this.showButton($('.page-item-previous', this.paginateList), currentPage - 1);
        this.hideButton($('.page-item-next', this.paginateList));
    } else {
        this.showButton($('.page-item-next', this.paginateList), currentPage + 1);
        this.showButton($('.page-item-previous', this.paginateList), currentPage - 1);
    }
};

Pagination.prototype.getPagesToShow = function(currentPage) {
    var showPages = [];
    var left = 0;
    var right = 0;
    for (var i = currentPage - this.maxNumberOfPages - 1; i <= currentPage + this.maxNumberOfPages - 1; i++) {
        if (i <= 0 || i > this.numberOfPages) {
            continue;
        }
        showPages.push(i);
        if (i < currentPage) {
            left++;
        } else if (i > currentPage) {
            right++;
        }
    }

    while (showPages.length > this.maxNumberOfPages) {
        if (left > right) {
            showPages.shift();
            left--;
        } else {
            showPages.pop();
            right--;
        }
    }

    return showPages;
};

Pagination.prototype.hideButton = function(button) {
    $(button).addClass('disabled');
    $('.page-link', button)
        .attr('href', '')
        .attr('aria-disabled', 'true')
        .attr('tabindex', -1)
        .attr('role', 'button');
};

Pagination.prototype.showButton = function(button, page) {
    $(button).removeClass('disabled');
    $('.page-link', button)
        .attr('href', this.link.replace('{page}', page))
        .attr('aria-disabled', 'false')
        .attr('tabindex', 0)
        .attr('role', undefined);
};

export default Pagination;
