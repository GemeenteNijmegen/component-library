Feature: Visual component check

    As a developer I want to make sure I don't unexpectetly change components visually.

    Background: Disable accessibility rule
        Given I disable the accessibility rule "page-has-heading-one"

    Scenario Outline: Visually check the components

        When I open the component "<component>"
        Then I expect the screenshot of "<component>" matches the web page
        And the page should be accessible

        Scenarios:
            | component |
            | accordion |
            | button--info |
            | button--primary |
            | button--secondary |
            | button-floating |
            | button-horizontal-collapse |
            | cards-filename |
            | cards-news |
            | cards-services |
            | cards-services-no-icon |
            | checkbox |
            | date-picker |
            | footer |
            | hover-effects |
            | icons |
            | input |
            | textarea |
            | lightbox |
            | no-title-link |
            | no-title-no-link |
            | title-link |
            | title-no-link |
            | listing |
            | multiple-upload |
            | navbar--default |
            | navbar--default-white |
            | navbar--no-search |
            | navbar--no-menu |
            | navbar--no-menu-no-search |
            | navbar--no-logo |
            | pagination |
            | pills--primary |
            | pills--secondary |
            | complex-table |
            | normal-table |
            | autocomplete |
            | facets |
            | facets-advanced |
            | radio-button |
            | results |
            | select |
            | stepper |
            | sticky-content |
            | switch |
            | tabs--tabs |
            | tabs--tabs-no-line |
            | tabs--pills |
            | badges |
            | labels--default |
            | labels--primary |
            | labels--success |
            | labels--info |
            | labels--warning |
            | labels--danger |
            | tags |
            | time-picker |
            | tooltips |
            | anchors |
            | headings |
            | inline-text-elements |
            | lists |
            | paragraph |
