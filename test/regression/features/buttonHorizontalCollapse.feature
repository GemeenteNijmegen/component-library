Feature: Button horizontal collapse

    The button-horizontal-collapse component will collapse and expand

    Background: Disable accessibility rule
        Given I disable the accessibility rule "page-has-heading-one"
        
    Scenario: Expand the buttons
        When I open the component "button-horizontal-collapse"
        And I click on the "collapse button"
        Then I expect the "button row" to be visible
        And the page should be accessible
