# @longlast/pipe

## 0.0.4 (2025-12-21)

This release refactors `pipe` to use more code from
`@longlast/function-provenance`. The size of bundles that use both packages
might be reduced by a few bytes.

## 0.0.3 (2025-12-20)

This release adds support for provenance tracking on piped functions.

## 0.0.2 (2025-12-15)

The documentation for Longlast has been split into a handbook and a reference
section. This patch release just updates the documentation link in the readme
to point to the new location of the reference docs.

## 0.0.1 (2025-12-14)

This initial version of `@longlast/pipe` exports a `pipe` function that
composes up to 10 functions left-to-right.
