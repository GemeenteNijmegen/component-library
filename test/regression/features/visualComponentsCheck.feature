Feature: Visual component check

    As a developer I want to make sure I don't unexpectetly change components visually.

    Scenario Outline: Visually check the components

        When I open the component "<component>"
        Then I expect the screenshot of "<component>" matches the web page

        Scenarios:
            | component |
            | accordion |
            | alerts--success |
            | alerts--info |
            | alerts--warning |
            | alerts--error |
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
            | navbar-primary--default |
            | navbar-primary--no-search |
            | navbar-primary--no-menu |
            | navbar-primary--no-menu-no-search |
            | navbar-white--default |
            | navbar-white--no-search |
            | pagination |
            | pills--primary |
            | pills--secondary |
            | popovers |
            | complex-table |
            | normal-table |
            | autocomplete |
            | facets |
            | facets-advanced |
            | results |
            | select |
            | sidenav |
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
