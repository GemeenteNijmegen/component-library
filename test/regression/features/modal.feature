Feature: Modal

    The modal should open when you click the button

@focus
    Scenario: Click the button

        Given I open the component "modals"
        When I click on the "button"
        And I wait for 1 second
        Then I expect the "modal" to be visible
