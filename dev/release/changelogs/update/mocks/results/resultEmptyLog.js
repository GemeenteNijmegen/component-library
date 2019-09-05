const today = new Date();
const resultEmptyLog = `---
title: Changelog
status: ready # draft, ready
---


All notable changes to this project will be documented in this file.<br>
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [2.0.1] - ${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}
### Added
- *Component:* [hover effects]({{ componentPath '@hover-effects' }})  
  *Description:* Added something
- *Component:* [icons]({{ componentPath '@icons' }})  
  *Description:* Added something

### Changed
- *Component:* [hover effects]({{ componentPath '@hover-effects' }})  
  *Changes:* **CSS**, **JS**  
  *Description:* Change 1
- *Component:* [hover effects]({{ componentPath '@hover-effects' }})  
  *Changes:* **HTML**, **JS**  
  *Description:* Change 2

### Removed
- *Component:* [hover effects]({{ componentPath '@hover-effects' }})  
  *Description:* Removed something
- *Component:* [alerts]({{ componentPath '@alerts' }})  
  *Description:* Removed something
`;

module.exports = { resultEmptyLog };
