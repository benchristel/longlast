# Decision Log

This document lists choices I've made in the design of longlast that I don't
want to have to make again.

## 2025-08-29: No `$name` in `@longlast/symbols`

[`displayName`] is already a quasi-standard (see: React, Firefox) so we should
just use that. There's no need to define a special `$name` symbol.

[`displayName`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName

## 2025-12-18: Registered symbols in `@longlast/symbols`

The requirement for all code using @longlast packages to have the same exact
version of `@longlast/symbols` seems doomed to cause bugs. Worse, the bugs are
likely to be subtle.

We can obviate this requirement by registering the symbols using
`Symbol.for(name)`. This allows people to get the symbols without importing
anything from @longlast, but it is not clear to me that that is a downside.

To prevent collisions, the names should be namespaced: `@longlast/$equals` etc.
