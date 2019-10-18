Feature: Lightbox

    The lightbox will show a big image
    
    Background: Disable accessibility rule
        Given I disable the accessibility rule "page-has-heading-one"

    Scenario: Show the big image
        Given I open the component "lightbox"
        When I click on the "fifth image"
        Then I expect the "lightbox overlay" to be visible
        When I wait for 2 seconds
        Then I expect the screenshot of "lightbox overlay" matches the web page
        # We cannot change the default ui 
        And the page excluding ".pswp__item" should be accessible
