---
title: Versioning
status: ready # draft, ready
---

This component library uses [Semantic Versioning](https://semver.org/).

## Version numbers

Every new release has a version number that has 3 parts: [major].[minor].[patch]

This is the meaning when one of those versions is upgraded:
 
1. **MAJOR** (**A**.b.c): This release has incompatible changes, please read the changelog carefully
2. **MINOR** (a.**B**.c): This release adds new functionality but in a backwards-compatible manner, you can upgrade to this version without consequences
3. **PATCH** (a.b.**C**):This release has small backwards-compatible (bug) fixes.

## Version information

The version information can be found in the [changelog](changelog.html)

You can click to an older version of the componentlibrary. It is also possible to use an older version in your application but it is recommended to upgrade to the latest version when possible.

## Updating scripts and stylesheets

When implementing a newer version you should always update the url of all the scripts and stylesheets mentioned in the [How To Use](how-to-use.html) docs. The url always contains the version number.
