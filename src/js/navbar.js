var navbarToggler = $('.navbar-toggler');

// close if clicked outside the navbar
$(document).on('click', function(event) {
    if (
        navbarToggler.is(':visible') &&
        !navbarToggler.hasClass('collapsed') &&
        !$(event.target).closest('.navbar-toggler').length &&
        !$(event.target).closest('.navbar-collapse').length
    ) {
        navbarToggler.trigger('click');
    }
});

// close if there is a smooth scroll
if (navbarToggler.is(':visible')) {
    $('.navbar-nav.smooth-scroll').each(function() {
        $('.nav-link', this).click(function(event) {
            if (!navbarToggler.hasClass('collapsed')) {
                navbarToggler.trigger('click');
            }
        });
    });
}

var SCROLLING_NAVBAR_OFFSET_TOP = 50;
$(window)
    .off('scroll')
    .on('scroll', function() {
        var $navbar = $('.navbar');
        if ($navbar.length) {
            if ($navbar.offset().top > SCROLLING_NAVBAR_OFFSET_TOP) {
                $('.scrolling-navbar').addClass('top-nav-collapse');
            } else {
                $('.scrolling-navbar').removeClass('top-nav-collapse');
            }
        }
    });

var navbarSearch = new NavbarSearch();
$(document).ready(function() {
    navbarSearch.init();
});

function NavbarSearch() {}

NavbarSearch.prototype.init = function() {
    $('#navbar-open-search').click(this.openSearch);
    $('.autocomplete').on('close', this.closeSearch);
    $('#navbar-close-search').click(this.closeSearch);
};

NavbarSearch.prototype.openSearch = function(event) {
    $('.navbar').addClass('search-open');
    $('.autocomplete__input').focus();
    event.stopPropagation();
    event.preventDefault();
};

NavbarSearch.prototype.closeSearch = function() {
    $('.navbar').removeClass('search-open');
    $('#navbar-open-search').focus();
};
