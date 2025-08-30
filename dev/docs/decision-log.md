# Decision Log

This document lists choices I've made in the design of longlast that I don't
want to have to make again.

## 2025-08-29: No `$name` in `@longlast/symbols`

[`displayName`] is already a quasi-standard (see: React, Firefox) so we should
just use that. There's no need to define a special `$name` symbol.

[`displayName`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName
