# @longlast/function-provenance

## 0.1.1 (2025-12-21)

This release adds the `trackProvenance` function.

## 0.1.0 (2025-12-20)

This release replaces the use of `AnyFunction` in exported types with
`UnknownFunction`. This is a breaking change.

## 0.0.3 (2025-12-20)

This release adds `getUnapplied()`, which returns a copy of the given function
with no arguments bound.

## 0.0.2 (2025-12-08)

This release adds `getBoundArguments()`, which calls the
`[$getBoundArguments]()` method on a function and handles the case where the
method is not defined.

## 0.0.1 (2025-12-08)

This initial version of `@longlast/function-provenance` exports a
`FunctionProvenance` type, which contains information about the source and
bound arguments of a partially applied function.
