const today = new Date();
const resultEmptyLog = `---
title: Changelog
status: ready # draft, ready
---


All notable changes to this project will be documented in this file.<br>
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [2.0.1] - ${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}
### Added
- _Component [hover effects]({{ componentPath '@hover-effects' }})_:
  Added something
- _Component [icons]({{ componentPath '@icons' }})_:
  Added something

### Changed
- _Component [hover effects]({{ componentPath '@hover-effects' }})_:
  Change 1
- _Component [hover effects]({{ componentPath '@hover-effects' }})_:
  Change 2

### Removed
- _Component [hover effects]({{ componentPath '@hover-effects' }})_:
  Removed something
- _Component [alerts]({{ componentPath '@alerts' }})_:
  Removed something
`;

module.exports = { resultEmptyLog };
