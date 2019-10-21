Feature: Carousel

    Check the visual appearance of the Carousel

    Background: Disable accessibility rule
        Given I disable the accessibility rule "page-has-heading-one"
        
    Scenario: Check the carousel

        Given I open the component "carousel"
        When I pause the carousel on slide nr 2
        Then I expect the screenshot of "carousel" matches the web page
        And the page should be accessible
