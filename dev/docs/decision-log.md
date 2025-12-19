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

## 2025-12-19: Tentatively use `displayName`, for performance

<details>
<summary>Rationale</summary>

Problem: we need a way to name functions for human-readable display. Function
names should persist across partial applications.

Background: the `displayName` property of functions is nonstandard, but used by
some libraries (notably React) and environments (notably Firefox).

The `name` property is standard and configurable, so we could use that.
However, setting it is about 13x slower than setting the `displayName`
property. Switching to `name` measurably slowed down `curry` on the benchmark.
The performance penalty is incurred when creating a curried function, and when
partially applying it.

I am inclined to think that performance matters more than using the standard
property. Function names aren't likely to be used often in production; they are
mainly a convenience for debugging and testing. Longlast will provide an API
for getting the function name, so it doesn't really matter what property we
choose.

If we have to set both `displayName` and `name` in the future, it wouldn't be
the end of the world.

An alternative I considered was to wrap functions to be named in a method with
a dynamically assigned `name`:

```ts
const fNamed = ({[fname]: (...args) => f(...args)}[fname]);
```

However, that also incurs a performance penalty when `fNamed` is called. It
seems like V8 might optimize the call somewhat, e.g. avoiding the creation of
an array for `args`. Still, it isn't free. It slowed down curried functions on
the benchmark by 6x.

</details>

### Conclusions:

- Set `displayName` to customize the name of a function.
- To avoid breaking changes, code should not read `displayName` directly.
  Instead, it should use `@longlast/function-name`.
