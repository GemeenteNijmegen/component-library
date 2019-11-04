Feature: Autocomplete

    The autocomplete has two buttons: clear and search. 
    The search button will be visible when there is nothing in the input field.
    The clear button will only be visible when something has been typed in the input field.

    Background: Disable accessibility rule
        Given I disable the accessibility rule "page-has-heading-one"
    
    Scenario: Initially the clear button is hidden

        Given I open the component "autocomplete"
        Then I expect the "clear icon" to be not visible
        And I expect the "search icon" to be visible
        And the page should be accessible

    Scenario: Search button will dissapear and the search button will show when I type

        Given I open the component "autocomplete"
        And I wait for 0.5 seconds
        When I type "something" in the "input field"
        Then I expect the "clear icon" to be visible
        And I expect the "search icon" to be not visible
        And the page should be accessible

    Scenario: Search button will show again when the field is cleared

        Given I open the component "autocomplete"
        And I wait for 0.5 seconds
        When I type "something" in the "input field"
        And I click on the "clear icon"
        Then I expect the "clear icon" to be not visible
        And I expect the "search icon" to be visible
        And the page should be accessible
