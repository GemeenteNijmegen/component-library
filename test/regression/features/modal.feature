Feature: Modal

    The modal should open when you click the button

    Scenario: Click the button

        Given I open the component "modals"
        When I click on the "button"
        And I wait for 0.6 seconds
        Then I expect the "modal" to be visible
