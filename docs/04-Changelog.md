---
title: Changelog
status: ready # draft, ready
---


All notable changes to this project will be documented in this file.<br>
The format is based on [Keep a Changelog](http://keepachangelog.com/).

**Important note:** Please make sure to include the correct integrity hash when a **CSS** or **JS** file is has changed.

{{> changes changelog=(changelogUnreleased) title="Unreleased"}}

{{#each (changelogReleasedNew) as |item|}}
{{> changes changelog=item.changelog title=(concat "<a href=\"/v" item.version "/\">" item.version "</a> | " (formatDate item.date)) }}
{{/each}}

{{#each (changelogReleasedOld) as |item|}}
{{> changes changelog=item.changelog title=(concat "<a href=\"/v3/\">" item.version "</a> | " (formatDate item.date)) }}
{{/each}}
