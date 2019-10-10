Feature: Lightbox

    The lightbox will show a big image
    
    Scenario: Show the big image
        Given I open the component "lightbox"
        When I click on the "first image"
        And I wait for 1 second
        Then I expect the "lightbox overlay" to be visible
        And I expect the screenshot of "lightbox overlay" matches the web page
