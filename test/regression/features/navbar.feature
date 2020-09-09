Feature: Accessible navbar

    The navbar should be accessible for keyboard users

    Scenario: The keyboard can be used to navigate to a link on the same page (scroll)
        Given I open the component "navbar"
        When I press enter on an internal link
        Then I scroll to the correct item on the page

    Scenario: The keyboard can be used to navigate to an external link
        Given I open the component "navbar"
        When I press enter on an external link
        Then I navigate to the external page
