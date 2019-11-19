---
title: Changelog
status: ready # draft, ready
---


All notable changes to this project will be documented in this file.<br>
The format is based on [Keep a Changelog](http://keepachangelog.com/).

{{> changes changelog=(changelogUnreleased) title="Unreleased"}}

{{#each (changelogReleased) as |item|}}
{{> changes changelog=item.changelog title=(concat "[" item.version "] - " (formatDate item.date)) }}
{{/each}}
