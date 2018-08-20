---
title: Changelog
status: ready # draft, ready
---


All notable changes to this project will be documented in this file.<br>
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [Unreleased]
### Added
- _Component [carousel]({{ componentPath '@carousel' }})_:
Guidance on adding `aria-label` with icons

### Changed
- _Component [carousel]({{ componentPath '@carousel' }})_:
Icons changed to span elements

### Removed
- _Component [carousel]({{ componentPath '@carousel' }})_:
  Removed `role="listbox"` and `role="option"` to ensure the carousel works with a screen reader

## [2.0.0] - 2018-06
### Added
- MDBootstrap v4.5.0
- _Component [footer]({{ componentPath '@footer' }})_:
  added `text-center` to `footer-copyright`
- _Component navbar ([primary]({{ componentPath '@navbar-primary--default' }}) and [white]({{ componentPath '@navbar-white--default' }}))_:
  added class `ml-auto` to `form` element
- _Component [sidenav]({{ componentPath '@sidenav' }})_:
  as of MDB v4.5.0, sidenav relies on a custom scrollbar thus a container element is needed surrounding the original `ul` element

### Changed
- _Component cards ([filename]({{ componentPath '@cards-filename' }}), [news]({{ componentPath '@cards-news' }}), [services]({{ componentPath '@cards-services' }}), [services no icon]({{ componentPath '@cards-services-no-icon' }}))_:
  changed `card-block` to `card-body`
- _Component navbar ([primary]({{ componentPath '@navbar-primary--default' }}) and [white]({{ componentPath '@navbar-white--default' }}))_:
  changed `navbar-toggleable-md` to `navbar-expand-lg`
- _[Template default]({{ componentPath '@default-template' }})_:
  changed `hidden-md-up` to `d-md-none` since the underlying Bootstrap version (as part of the MDB framework as a whole) updated to v4 and uses different display utilities (see: {{ mdbootstrapPath '/utilities/bootstrap-display-property/' }})

### Removed
- _Component [popovers]({{ componentPath '@popovers' }})_:
  removed obsolete `data-trigger="focus"` attribute, since this already is specified in the JavaScript initialization
- _Component [sidenav]({{ componentPath '@sidenav' }})_:
  removed class `sn-bg-1` from `ul` element

## [1.0.0] - 2017-09
### Added
- First stable release of the Nijmegen Component Library
