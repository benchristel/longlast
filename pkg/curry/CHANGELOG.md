# @longlast/curry

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
