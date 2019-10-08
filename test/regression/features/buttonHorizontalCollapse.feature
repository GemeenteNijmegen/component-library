Feature: Button horizontal collapse

    The button-horizontal-collapse component will collapse and expand

    Scenario: Expand the buttons
        When I open the component "button-horizontal-collapse"
        And I click on the "collapse button"
        Then I expect the "button row" to be visible
