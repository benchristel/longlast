# @longlast/curry

## 0.7.0 (2025-12-20)

The function provenance API of `curry` is now defined in terms of functions
exported by `@longlast/function-provenance`. The API specs have been updated
to reflect this.

## 0.6.4 (2025-12-19)

This release contains minor performance improvements.

## 0.6.3 (2025-12-15)

The documentation for Longlast has been split into a handbook and a reference
section. This patch release just updates the documentation link in the readme
to point to the new location of the reference docs.

## 0.6.2 (2025-12-08)

This release contains internal improvements. `@longlast/curry` now depends on
`@longlast/function-provenance`; this change might reduce the size of bundles
that use both packages by a few bytes.

## 0.6.1 (2025-12-06)

The `[$getBoundArguments]`, `[$unapplied]`, and `displayName`
properties of curried functions are now grouped together onto
an unexported interface, `FunctionProvenance`. This change is
reflected in the docs, but the code functions exactly the
same.

## 0.6.0 (2025-10-18)

Users of `curry` will now correctly get type errors if they pass a
partially-applied curried function as a callback to a function that will call
it with the wrong argument types.

```ts
const concat3 = curry((a: string, b: string, c: string) => a + b + c);
// Type error! `Array.map()` calls the callback with the index (a number) as
// the second argument. `concat3("b")` requires a string as the second
// argument.
["a"].map(concat3("b"));
```

## 0.5.2 (2025-10-18)

This release reverts the documentation changes made in 0.5.1.

## 0.5.1 (2025-10-17)

This release just contains documentation changes.

## 0.5.0 (2025-09-13)

### Breaking change

This release removes the `[$boundArguments]` property from curried functions.
Clients should use the `[$getBoundArguments]` method instead.

This change improves the performance of partially applying a curried function.

## 0.4.5 (2025-09-13)

Curried functions now have a `[$getBoundArguments]` method, the
`$getBoundArguments` symbol coming from `@longlast/symbols`. The
`[$boundArguments]` property is deprecated and will be removed in the next
release.

## 0.4.4 (2025-09-07)

This release just adds a "Performance" section to the README, and makes
internal improvements to the code.

## 0.4.3 (2025-09-05)

This release just updates the `package.json` file to link to the project
homepage.

## 0.4.2 (2025-09-05)

This release fixes a bug where partially applied 3-ary curried functions had
the `[$boundArguments]` property set incorrectly.

## 0.4.1 (2025-09-04)

This release fixes a bug where partially applied 3-ary curried functions would
only remember the arguments from the most recent application. For example, this
code:

```js
const add3 = curry((a, b, c) => a + b + c);
console.log(add3(1)(2)[$boundArguments])
```

would incorrectly print `[2]` instead of `[1, 2]` in previous releases of
`@longlast/curry`.

## 0.4.0 (2025-09-01)

### Breaking changes

This release of `@longlast/curry` updates the dependency on `@longlast/symbols`
to `^1.0.0`. If you install this version of `@longlast/curry`, all your other
packages must also be using a 1.x.x version of `@longlast/symbols`. Otherwise,
you will not be able to access the `$boundArguments` and `$unapplied`
properties of curried functions.

## 0.3.3 (2025-08-30)

Curried functions now have an `$unapplied` property, which holds arguments
passed to partial applications of the function.

## 0.3.2 (2025-08-30)

Curried functions now have a `$boundArguments` property, which holds arguments
passed to partial applications of the function.

## 0.3.1 (2025-08-30)

Curried functions now have a `displayName` property, which by default is the
original, uncurried function's `name`. Partially-applied curried functions
inherit the `displayName` of the curried function.

## 0.3.0 (2025-08-27)

### Breaking changes

This release removes the export of `curryVarargs`, which was intended to be a
private function.

## 0.2.3 (2025-08-27)

This patch release just adds installation instructions and a usage example to
the readme file.

## 0.2.2 (2025-08-27)

This patch release just updates the package metadata in `package.json`.

## 0.2.1 (2025-08-26)

This patch release makes internal improvements to `curry`.

## 0.2.0 (2025-08-24)

This release generalizes `curry` to functions of 2 to 5 arguments.

### Breaking Changes

The `Curried2` type is no longer user-constructible.

## 0.1.0 (2025-08-21)

This initial release of `@longlast/curry` exports a `curry` function that can
only curry two-argument functions.
