Feature: Lightbox

    The lightbox will show a big image

    Background: Disable accessibility rule
        Given I disable the accessibility rules "page-has-heading-one,aria-dialog-name"

    Scenario: Show the big image
        Given I open the component "lightbox"
        When I click on the "fifth image"
        And I wait until all navigation is done
        And I wait for 3 seconds
        Then I expect the screenshot of "lightbox overlay" matches the web page
        # We cannot change the default ui
        And the page excluding ".pswp__item" should be accessible
