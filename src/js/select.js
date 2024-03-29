/**
 * ARIA Collapsible Dropdown Listbox
 *
 * Based on the https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html Example
 *
 * @function onload
 * @desc Initialize all aria-select elements once the page has loaded
 */
window.addEventListener('load', function() {
    $.each($('.aria-select'), function(index) {
        var selectInput = $('.aria-select').eq(index);
        var input = selectInput.find('input')[0];
        var button = selectInput.find('button')[0];
        var listBox = new aria.Listbox(selectInput.find('ul')[0]);
        new aria.ListBoxButton(input, button, listBox);
    });
});

var aria = {};

aria.ListBoxButton = function(input, button, listBox) {
    this.input = input;
    this.button = button;
    this.listBox = listBox;
    this.registerEvents();
};

aria.ListBoxButton.prototype.registerEvents = function() {
    this.button.addEventListener('click', this.showListBox.bind(this));
    this.button.addEventListener('keyup', this.checkShow.bind(this));
    this.listBox.listBoxNode.addEventListener('blur', this.hideListBox.bind(this));
    this.listBox.listBoxNode.addEventListener('keydown', this.checkHide.bind(this));
    this.listBox.setHandleFocusChange(this.onFocusChange.bind(this));
};

aria.ListBoxButton.prototype.checkShow = function(event) {
    var key = event.which || event.keyCode;

    switch (key) {
        case aria.KeyCode.UP:
        case aria.KeyCode.DOWN:
            if (event) event.preventDefault();
            this.showListBox();
            this.listBox.checkKeyPress(event);
            break;
    }
};

aria.ListBoxButton.prototype.checkHide = function(event) {
    var key = event.which || event.keyCode;

    switch (key) {
        case aria.KeyCode.RETURN:
        case aria.KeyCode.ESC:
            if (event) event.preventDefault();
            this.hideListBox();
            this.button.focus();
            break;
    }
};

aria.ListBoxButton.prototype.showListBox = function(event) {
    aria.Utils.removeClass(this.listBox.listBoxNode, 'hidden');
    this.button.setAttribute('aria-expanded', 'true');
    $(this.listBox.listBoxNode).animate(
        {
            opacity: 1,
            'max-height': '40.625rem',
        },
        800,
    );
    this.listBox.listBoxNode.focus();
    if (event) event.preventDefault();
};

aria.ListBoxButton.prototype.hideListBox = function(event) {
    aria.Utils.addClass(this.listBox.listBoxNode, 'hidden');
    $(this.listBox.listBoxNode).animate({
        opacity: 0,
        'max-height': '0rem',
    });
    this.button.removeAttribute('aria-expanded');
    if (event) event.preventDefault();
};

aria.ListBoxButton.prototype.onFocusChange = function(focusedItem) {
    this.input.value = focusedItem.getAttribute('data-value');
    this.button.innerText = focusedItem.innerText;
};

/**
 * @constructor
 *
 * @desc
 *  Listbox object representing the state and interactions for a listBox widget
 *
 * @param listBoxNode
 *  The DOM node pointing to the listBox
 */
aria.Listbox = function(listBoxNode) {
    this.listBoxNode = listBoxNode;
    this.activeDescendant = this.listBoxNode.getAttribute('aria-activedescendant');
    this.multiselectable = this.listBoxNode.hasAttribute('aria-multiselectable');
    this.moveUpDownEnabled = false;
    this.siblingList = null;
    this.upButton = null;
    this.downButton = null;
    this.moveButton = null;
    this.keysSoFar = '';
    this.handleFocusChange = function() {};
    this.handleItemChange = function(event, items) {};
    this.registerEvents();
};

/**
 * @desc
 *  Register events for the listBox interactions
 */
aria.Listbox.prototype.registerEvents = function() {
    this.listBoxNode.addEventListener('focus', this.setupFocus.bind(this));
    this.listBoxNode.addEventListener('keydown', this.checkKeyPress.bind(this));
    this.listBoxNode.addEventListener('click', this.checkClickItem.bind(this));
};

/**
 * @desc
 *  If there is no activeDescendant, focus on the first option
 */
aria.Listbox.prototype.setupFocus = function() {
    if (this.activeDescendant) {
        return;
    }

    this.focusFirstItem();
};

/**
 * @desc
 *  Focus on the first option
 */
aria.Listbox.prototype.focusFirstItem = function() {
    var firstItem;

    firstItem = this.listBoxNode.querySelector('[role="option"]');

    if (firstItem) {
        this.focusItem(firstItem);
    }
};

/**
 * @desc
 *  Focus on the last option
 */
aria.Listbox.prototype.focusLastItem = function() {
    var itemList = this.listBoxNode.querySelectorAll('[role="option"]');

    if (itemList.length) {
        this.focusItem(itemList[itemList.length - 1]);
    }
};

/**
 * @desc
 *  Handle various keyboard controls; UP/DOWN will shift focus; SPACE selects
 *  an item.
 *
 * @param event
 *  The keydown event object
 */
aria.Listbox.prototype.checkKeyPress = function(event) {
    var key = event.which || event.keyCode;
    var nextItem = document.getElementById(this.activeDescendant);

    if (!nextItem) {
        return;
    }

    switch (key) {
        case aria.KeyCode.PAGE_UP:
        case aria.KeyCode.PAGE_DOWN:
            if (this.moveUpDownEnabled) {
                if (event) event.preventDefault();

                if (key === aria.KeyCode.PAGE_UP) {
                    this.moveUpItems();
                } else {
                    this.moveDownItems();
                }
            }

            break;
        case aria.KeyCode.UP:
        case aria.KeyCode.DOWN:
            if (event) event.preventDefault();

            if (this.moveUpDownEnabled && event.altKey) {
                if (key === aria.KeyCode.UP) {
                    this.moveUpItems();
                } else {
                    this.moveDownItems();
                }
                return;
            }

            if (key === aria.KeyCode.UP) {
                nextItem = nextItem.previousElementSibling;
            } else {
                nextItem = nextItem.nextElementSibling;
            }

            if (nextItem) {
                this.focusItem(nextItem);
            }

            break;
        case aria.KeyCode.HOME:
            if (event) event.preventDefault();
            this.focusFirstItem();
            break;
        case aria.KeyCode.END:
            if (event) event.preventDefault();
            this.focusLastItem();
            break;
        case aria.KeyCode.SPACE:
            if (event) event.preventDefault();
            this.toggleSelectItem(nextItem);
            break;
        case aria.KeyCode.BACKSPACE:
        case aria.KeyCode.DELETE:
        case aria.KeyCode.RETURN:
            if (!this.moveButton) {
                return;
            }

            var keyshortcuts = this.moveButton.getAttribute('aria-keyshortcuts');
            if (key === aria.KeyCode.RETURN && keyshortcuts.indexOf('Enter') === -1) {
                return;
            }
            if (
                (key === aria.KeyCode.BACKSPACE || key === aria.KeyCode.DELETE) &&
                keyshortcuts.indexOf('Delete') === -1
            ) {
                return;
            }

            if (event) event.preventDefault();

            var nextUnselected = nextItem.nextElementSibling;
            while (nextUnselected) {
                if (nextUnselected.getAttribute('aria-selected') != 'true') {
                    break;
                }
                nextUnselected = nextUnselected.nextElementSibling;
            }
            if (!nextUnselected) {
                nextUnselected = nextItem.previousElementSibling;
                while (nextUnselected) {
                    if (nextUnselected.getAttribute('aria-selected') != 'true') {
                        break;
                    }
                    nextUnselected = nextUnselected.previousElementSibling;
                }
            }

            this.moveItems();

            if (!this.activeDescendant && nextUnselected) {
                this.focusItem(nextUnselected);
            }
            break;
        default:
            var itemToFocus = this.findItemToFocus(key);
            if (itemToFocus) {
                this.focusItem(itemToFocus);
            }
            break;
    }
};

aria.Listbox.prototype.findItemToFocus = function(key) {
    var itemList = this.listBoxNode.querySelectorAll('[role="option"]');
    var character = String.fromCharCode(key);

    if (!this.keysSoFar) {
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i].getAttribute('id') == this.activeDescendant) {
                this.searchIndex = i;
            }
        }
    }
    this.keysSoFar += character;
    this.clearKeysSoFarAfterDelay();

    var nextMatch = this.findMatchInRange(itemList, this.searchIndex + 1, itemList.length);
    if (!nextMatch) {
        nextMatch = this.findMatchInRange(itemList, 0, this.searchIndex);
    }
    return nextMatch;
};

aria.Listbox.prototype.clearKeysSoFarAfterDelay = function() {
    if (this.keyClear) {
        clearTimeout(this.keyClear);
        this.keyClear = null;
    }
    this.keyClear = setTimeout(
        function() {
            this.keysSoFar = '';
            this.keyClear = null;
        }.bind(this),
        500,
    );
};

aria.Listbox.prototype.findMatchInRange = function(list, startIndex, endIndex) {
    // Find the first item starting with the keysSoFar substring, searching in
    // the specified range of items
    for (var n = startIndex; n < endIndex; n++) {
        var label = list[n].innerText;
        if (label && label.toUpperCase().indexOf(this.keysSoFar) === 0) {
            return list[n];
        }
    }
    return null;
};

/**
 * @desc
 *  Check if an item is clicked on. If so, focus on it, select it and close the list box.
 *
 * @param event
 *  The click event object
 */
aria.Listbox.prototype.checkClickItem = function(event) {
    if (event.target.getAttribute('role') === 'option') {
        this.focusItem(event.target);
        this.toggleSelectItem(event.target);
        aria.Utils.addClass(this.listBoxNode, 'hidden');
    }
};

/**
 * @desc
 *  Toggle the aria-selected value
 *
 * @param element
 *  The element to select
 */
aria.Listbox.prototype.toggleSelectItem = function(element) {
    if (this.multiselectable) {
        element.setAttribute('aria-selected', element.getAttribute('aria-selected') === 'true' ? 'false' : 'true');

        if (this.moveButton) {
            if (this.listBoxNode.querySelector('[aria-selected="true"]')) {
                this.moveButton.setAttribute('aria-disabled', 'false');
            } else {
                this.moveButton.setAttribute('aria-disabled', 'true');
            }
        }
    }
};

/**
 * @desc
 *  Defocus the specified item
 *
 * @param element
 *  The element to defocus
 */
aria.Listbox.prototype.defocusItem = function(element) {
    if (!element) {
        return;
    }

    aria.Utils.removeClass(element, 'focused');
};

aria.Listbox.prototype.deselectItem = function(element) {
    if (!element) {
        return;
    }

    element.setAttribute('aria-selected', false);
};

/**
 * @desc
 *  Focus on the specified item
 *
 * @param element
 *  The element to focus
 */
aria.Listbox.prototype.focusItem = function(element) {
    if (!this.multiselectable) {
        this.deselectItem(document.getElementById(this.activeDescendant));
        element.setAttribute('aria-selected', true);
    }

    this.defocusItem(document.getElementById(this.activeDescendant));
    aria.Utils.addClass(element, 'focused');
    this.listBoxNode.setAttribute('aria-activedescendant', element.id);
    this.activeDescendant = element.id;

    if (this.listBoxNode.scrollHeight > this.listBoxNode.clientHeight) {
        var scrollBottom = this.listBoxNode.clientHeight + this.listBoxNode.scrollTop;
        var elementBottom = element.offsetTop + element.offsetHeight;
        if (elementBottom > scrollBottom) {
            this.listBoxNode.scrollTop = elementBottom - this.listBoxNode.clientHeight;
        } else if (element.offsetTop < this.listBoxNode.scrollTop) {
            this.listBoxNode.scrollTop = element.offsetTop;
        }
    }

    if (!this.multiselectable && this.moveButton) {
        this.moveButton.setAttribute('aria-disabled', false);
    }

    this.checkUpDownButtons();
    this.handleFocusChange(element);
};

/**
 * @desc
 *  Enable/disable the up/down arrows based on the activeDescendant.
 */
aria.Listbox.prototype.checkUpDownButtons = function() {
    var activeElement = document.getElementById(this.activeDescendant);

    if (!this.moveUpDownEnabled) {
        return false;
    }

    if (!activeElement) {
        this.upButton.setAttribute('aria-disabled', 'true');
        this.downButton.setAttribute('aria-disabled', 'true');
        return;
    }

    if (this.upButton) {
        if (activeElement.previousElementSibling) {
            this.upButton.setAttribute('aria-disabled', false);
        } else {
            this.upButton.setAttribute('aria-disabled', 'true');
        }
    }

    if (this.downButton) {
        if (activeElement.nextElementSibling) {
            this.downButton.setAttribute('aria-disabled', false);
        } else {
            this.downButton.setAttribute('aria-disabled', 'true');
        }
    }
};

/**
 * @desc
 *  Add the specified items to the listBox. Assumes items are valid options.
 *
 * @param items
 *  An array of items to add to the listBox
 */
aria.Listbox.prototype.addItems = function(items) {
    if (!items || !items.length) {
        return false;
    }

    items.forEach(
        function(item) {
            this.defocusItem(item);
            this.toggleSelectItem(item);
            this.listBoxNode.append(item);
        }.bind(this),
    );

    if (!this.activeDescendant) {
        this.focusItem(items[0]);
    }

    this.handleItemChange('added', items);
};

/**
 * @desc
 *  Remove all of the selected items from the listBox; Removes the focused items
 *  in a single select listBox and the items with aria-selected in a multi
 *  select listBox.
 *
 * @returns items
 *  An array of items that were removed from the listBox
 */
aria.Listbox.prototype.deleteItems = function() {
    var itemsToDelete;

    if (this.multiselectable) {
        itemsToDelete = this.listBoxNode.querySelectorAll('[aria-selected="true"]');
    } else if (this.activeDescendant) {
        itemsToDelete = [document.getElementById(this.activeDescendant)];
    }

    if (!itemsToDelete || !itemsToDelete.length) {
        return [];
    }

    itemsToDelete.forEach(
        function(item) {
            item.remove();

            if (item.id === this.activeDescendant) {
                this.clearActiveDescendant();
            }
        }.bind(this),
    );

    this.handleItemChange('removed', itemsToDelete);

    return itemsToDelete;
};

aria.Listbox.prototype.clearActiveDescendant = function() {
    this.activeDescendant = null;
    this.listBoxNode.setAttribute('aria-activedescendant', null);

    if (this.moveButton) {
        this.moveButton.setAttribute('aria-disabled', 'true');
    }

    this.checkUpDownButtons();
};

/**
 * @desc
 *  Shifts the currently focused item up on the list. No shifting occurs if the
 *  item is already at the top of the list.
 */
aria.Listbox.prototype.moveUpItems = function() {
    var previousItem;

    if (!this.activeDescendant) {
        return;
    }

    currentItem = document.getElementById(this.activeDescendant);
    previousItem = currentItem.previousElementSibling;

    if (previousItem) {
        this.listBoxNode.insertBefore(currentItem, previousItem);
        this.handleItemChange('moved_up', [currentItem]);
    }

    this.checkUpDownButtons();
};

/**
 * @desc
 *  Shifts the currently focused item down on the list. No shifting occurs if
 *  the item is already at the end of the list.
 */
aria.Listbox.prototype.moveDownItems = function() {
    var nextItem;

    if (!this.activeDescendant) {
        return;
    }

    currentItem = document.getElementById(this.activeDescendant);
    nextItem = currentItem.nextElementSibling;

    if (nextItem) {
        this.listBoxNode.insertBefore(nextItem, currentItem);
        this.handleItemChange('moved_down', [currentItem]);
    }

    this.checkUpDownButtons();
};

/**
 * @desc
 *  Delete the currently selected items and add them to the sibling list.
 */
aria.Listbox.prototype.moveItems = function() {
    if (!this.siblingList) {
        return;
    }

    var itemsToMove = this.deleteItems();
    this.siblingList.addItems(itemsToMove);
};

/**
 * @desc
 *  Enable Up/Down controls to shift items up and down.
 *
 * @param upButton
 *   Up button to trigger up shift
 *
 * @param downButton
 *   Down button to trigger down shift
 */
aria.Listbox.prototype.enableMoveUpDown = function(upButton, downButton) {
    this.moveUpDownEnabled = true;
    this.upButton = upButton;
    this.downButton = downButton;
    upButton.addEventListener('click', this.moveUpItems.bind(this));
    downButton.addEventListener('click', this.moveDownItems.bind(this));
};

/**
 * @desc
 *  Enable Move controls. Moving removes selected items from the current
 *  list and adds them to the sibling list.
 *
 * @param button
 *   Move button to trigger delete
 *
 * @param siblingList
 *   Listbox to move items to
 */
aria.Listbox.prototype.setupMove = function(button, siblingList) {
    this.siblingList = siblingList;
    this.moveButton = button;
    button.addEventListener('click', this.moveItems.bind(this));
};

aria.Listbox.prototype.setHandleItemChange = function(handlerFn) {
    this.handleItemChange = handlerFn;
};

aria.Listbox.prototype.setHandleFocusChange = function(focusChangeHandler) {
    this.handleFocusChange = focusChangeHandler;
};

/**
 * @desc
 *  Key code constants
 */
aria.KeyCode = {
    BACKSPACE: 8,
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
};

aria.Utils = aria.Utils || {};

// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
aria.Utils.matches = function(element, selector) {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = element.parentNode.querySelectorAll(s);
                var i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    return element.matches(selector);
};

aria.Utils.remove = function(item) {
    if (item.remove && typeof item.remove === 'function') {
        return item.remove();
    }
    if (item.parentNode && item.parentNode.removeChild && typeof item.parentNode.removeChild === 'function') {
        return item.parentNode.removeChild(item);
    }
    return false;
};

aria.Utils.isFocusable = function(element) {
    if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
        return true;
    }

    if (element.disabled) {
        return false;
    }

    switch (element.nodeName) {
        case 'A':
            return !!element.href && element.rel != 'ignore';
        case 'INPUT':
            return element.type != 'hidden' && element.type != 'file';
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
            return true;
        default:
            return false;
    }
};

aria.Utils.getAncestorBySelector = function(element, selector) {
    if (!aria.Utils.matches(element, selector + ' ' + element.tagName)) {
        // Element is not inside an element that matches selector
        return null;
    }

    // Move up the DOM tree until a parent matching the selector is found
    var currentNode = element;
    var ancestor = null;
    while (ancestor === null) {
        if (aria.Utils.matches(currentNode.parentNode, selector)) {
            ancestor = currentNode.parentNode;
        } else {
            currentNode = currentNode.parentNode;
        }
    }

    return ancestor;
};

aria.Utils.hasClass = function(element, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
};

aria.Utils.addClass = function(element, className) {
    if (!aria.Utils.hasClass(element, className)) {
        element.className += ' ' + className;
    }
};

aria.Utils.removeClass = function(element, className) {
    var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
    element.className = element.className.replace(classRegex, ' ').trim();
};
