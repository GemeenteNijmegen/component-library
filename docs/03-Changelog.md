---
title: Changelog
status: ready # draft, ready
---

All notable changes to this project will be documented in this file.<br>
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [1.0.0] - 2018-04
### Added
- MDBootstrap v4.5.0
- _Component footer_: added `text-center` to `footer-copyright`

### Changed
- _Component cards_: changed `card-block` to `card-body`
- _Component navbar_: changed `navbar-toggleable-md` to `navbar-expand-lg`
- _Template default_: changed `hidden-md-up` to `d-md-none` since the underlying Bootstrap version (as part of the MDB framework as a whole) updated to v4 and uses different display utilities (see: {{ mdbootstrapPath '/utilities/bootstrap-display-property/' }})

### Removed
- _Component popovers_: removed obsolete `data-trigger="focus"` attribute, since this already is specified in the JavaScript initialization
- _Component sidenav_: removed class `sn-bg-1` from `ul` element