---
title: Changelog
status: ready # draft, ready
---


All notable changes to this project will be documented in this file.<br>
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [2.0.0] - 2018-06
### Added
- MDBootstrap v4.5.9
- Documentation of the component preview (index) page within the How to use docs
- _Component [footer]({{ componentPath '@footer' }})_:
  added `text-center` to `footer-copyright`
- _Component navbar ([primary]({{ componentPath '@navbar-primary--default' }}) and [white]({{ componentPath '@navbar-white--default' }}))_:
  added class `ml-auto` to `form` element
- _Component [sidenav]({{ componentPath '@sidenav' }})_:
  as of MDB v4.5.0, sidenav relies on a custom scrollbar thus a container element is needed surrounding the original `ul` element
- _Component [button]({{ componentPath '@button' }})_:
  Using aria-label on the button and anchors
- _Component [button floating]({{ componentPath '@button-floating' }})_:
  Using aria-label on the button and anchors
- _Component [button horizontal-collapse]({{ componentPath '@button-horizontal-collapse' }})_:
  Using aria-label on the button and anchors
- _Component [footer]({{ componentPath '@footer' }})_:
  Allowing the use of header elements in the footer and ensuring the correct aria tags are present on the footer
- _Component [icons]({{ componentPath '@icons' }})_:
  Guidance on adding `aria-label` with icons
- _Component [badges]({{ componentPath '@badges' }})_:
  Placeholder alt text added
- _Component [pagination]({{ componentPath '@pagination' }})_:
  aria-label added to the navigation element
- _Component [stepper]({{ componentPath '@stepper' }})_:
  Placeholders added to each input
- _Component [navbar primary]({{ componentPath '@navbar-primary' }})_:
  Aria-label added to the search icon along with a tabindex
- _Component [navbar white]({{ componentPath '@navbar-white' }})_:
  Alt text added to the icon
- _Component [navbar white]({{ componentPath '@navbar-white' }})_:
  Aria-label added to the search icon along with a tabindex

### Changed
- _Component cards ([filename]({{ componentPath '@cards-filename' }}), [news]({{ componentPath '@cards-news' }}), [services]({{ componentPath '@cards-services' }}), [services no icon]({{ componentPath '@cards-services-no-icon' }}))_:
  changed `card-block` to `card-body`
- _Component navbar ([primary]({{ componentPath '@navbar-primary--default' }}) and [white]({{ componentPath '@navbar-white--default' }}))_:
  changed `navbar-toggleable-md` to `navbar-expand-lg`
- _[Template default]({{ componentPath '@default-template' }})_:
  changed `hidden-md-up` to `d-md-none` since the underlying Bootstrap version (as part of the MDB framework as a whole) updated to v4 and uses different display utilities (see: {{ mdbootstrapPath '/utilities/bootstrap-display-property/' }})
- _Component [alerts]({{ componentPath '@alerts' }})_:
  Alerts can now only be closed by clicking a close button and set Alerts status to prototype and updated docs to advise modal use
- _Component [button]({{ componentPath '@button' }})_:
  Replacing i tags with span with aria-hidden="true" and updated the button notes mentioning the use of anchors or button where appropriate
- _Component [button floating]({{ componentPath '@button-floating' }})_:
  Replacing i tags with span with aria-hidden="true" and updated the button notes mentioning the use of anchors or button where appropriate
- _Component [button horizontal-collapse]({{ componentPath '@button-horizontal-collapse' }})_:
  Replacing i tags with span with aria-hidden="true" and updated the button notes mentioning the use of anchors or button where appropriate
- _Component [footer]({{ componentPath '@footer' }})_:
  Replacing i tags with span
- _Component [hover effects]({{ componentPath '@hover-effects' }})_:
  Updated hover effects accessibility guidance for light and super light overlays
- _Component [icons]({{ componentPath '@icons' }})_:
  Icons changed to span elements
- _Component [title link]({{ componentPath '@title-link' }})_:
  Paragraph headers on list-group lists replaced with h tags with accessibility in mind
- _Component [title no-link]({{ componentPath '@title-no-link' }})_:
  Paragraph headers on list-group lists replaced with h tags with accessibility in mind
- _Component [search results]({{ componentPath '@search-results' }})_:
  Search result header tag changed to h tag
- _Component [sidenav]({{ componentPath '@sidenav' }})_:
  Set Sidenav status to prototype and updated docs to advise Do not implement!
- _Component [steppers]({{ componentPath '@steppers' }})_:
  Stepper updated to use `aria-label` and use span for icons
- _Component [sticky content]({{ componentPath '@sticky-content' }})_:
  Sticky content p title replace with h5
- _Component [accordion]({{ componentPath '@accordion' }})_:
  Replacing i tags with span
- _Component [input error]({{ componentPath '@input-error' }})_:
  Label font now darker to give more contrast against a white background
- _Component [input normal]({{ componentPath '@input-normal' }})_:
  Label font now darker to give more contrast against a white background
- _Component [input read-only]({{ componentPath '@input-read-only' }})_:
  Label font now darker to give more contrast against a white background
- _Component [textarea]({{ componentPath '@textarea' }})_:
  Label font now darker to give more contrast against a white background
- _Component [tags]({{ componentPath '@tags' }})_:
  Replacing i tag with a button for removal
- _Component [stepper]({{ componentPath '@stepper' }})_:
  Replaced the previous steppers component with a new responsive stepper form component
- _Component [stepper]({{ componentPath '@stepper' }})_:
  Added backward navigation to the stepper component
- _Component [stepper]({{ componentPath '@stepper' }})_:
  Disabled step contrast increased
- _Component [stepper]({{ componentPath '@stepper' }})_:
  Back and next buttons changed to work based on validation messages and not disabling buttons
- _Component [tabs]({{ componentPath '@tabs' }})_:
  Changed tabs to match aria accessibility guidelines

### Removed
- _Component [popovers]({{ componentPath '@popovers' }})_:
  removed obsolete `data-trigger="focus"` attribute, since this already is specified in the JavaScript initialization
- _Component [sidenav]({{ componentPath '@sidenav' }})_:
  removed class `sn-bg-1` from `ul` element

## [1.0.0] - 2017-09
### Added
- First stable release of the Nijmegen Component Library
- _Component [carousel]({{ componentPath '@carousel' }})_:
  Removed `role="listbox"` and `role="option"` to ensure the carousel works with a screen reader
- _Component [listing]({{ componentPath '@listing' }})_:
  Removed labelledby from the listing item
- _Component [pagination]({{ componentPath '@pagination' }})_:
  aria-label removed from page links where an sr-only element already exists
