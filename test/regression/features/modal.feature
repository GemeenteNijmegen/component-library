Feature: Modal

    The modal should open when you click the button

    Background: Disable accessibility rule
        Given I disable the accessibility rule "page-has-heading-one"
        
    Scenario Outline: Click the button

        Given I open the component "modals--<version>"
        When I click on the "button"
        And I wait for 0.5 second
        Then I expect the screenshot of "modals--<version>" matches the web page
        And the page should be accessible

        Scenarios:
            | version |
            | small   |
            | medium  |
            | large   |
