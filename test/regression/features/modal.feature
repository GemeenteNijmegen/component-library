Feature: Modal

    The modal should open when you click the button

    Scenario Outline: Click the button

        Given I open the component "modals--<version>"
        When I click on the "button"
        And I wait for 1 second
        Then I expect the screenshot of "modals--<version>" matches the web page

        Scenarios:
            | version |
            | small   |
            | medium  |
            | large   |
