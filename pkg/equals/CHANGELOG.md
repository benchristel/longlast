# @longlast/equals

## 0.5.3 (2025-09-06)

This release updates the dependency on `@longlast/curry` to `^0.5.0`, and
supports comparing curried functions from both `@longlast/curry@0.4.x` and
`@longlast/curry@0.5.x`. A future release will drop support for
`@longlast/curry@0.4.x`.

## 0.5.2 (2025-09-05)

This release just updates the `package.json` file to link to the project
homepage.

## 0.5.1 (2025-09-01)

Custom object comparison via the `$equals` symbol-named method now takes 
precedence over all other comparisons, including `Object.is()`.

## 0.5.0 (2025-09-01)

The `equals()` function now compares partially-applied curried functions,
considering them equal if they originate from the same curried function and
have equal bound arguments.

The behavior of `equals()` can now be customized per-class by defining an
`$equals` symbol-named method on the class. See the docs for details.

### Breaking changes

This release of `@longlast/equals` updates the dependency on
`@longlast/symbols` to `^1.0.0`. If you install this version of
`@longlast/equals`, all your other packages must also be using a 1.x.x version
of `@longlast/symbols`. Otherwise, the new features listed above might not
work.

## 0.4.4 (2025-08-30)

This patch release updates the dependency on `@longlast/curry` to `^0.3.0`.

## 0.4.3 (2025-08-27)

This patch release just adds installation instructions and a usage example to
the readme file.

## 0.4.2 (2025-08-27)

This patch release just updates the package metadata in `package.json`.

## 0.4.1 (2025-08-26)

This patch release optimizes `equals` to be smaller and faster. Comparing large
objects is now about 20% faster, relative to 0.4.0.

## 0.4.0 (2025-08-20)

This release curries `equals` so it can be called as either `equals(a, b)` or
`equals(a)(b)`.

## 0.3.0 (2025-08-19)

This release adds support for comparing `RegExp` objects.

## 0.2.1 (2025-08-19)

This patch release fixes two bugs:

- Previously, object properties with a value of `undefined` were being
  conflated with missing properties, so two objects like `{x: undefined}` and
  `{y: undefined}` would be considered equal. The behavior has been aligned
  with the documentation, so these objects are now considered unequal.
- Previously, non-enumerable object properties could affect the result of an
  `equals` comparison in some cases. Now, non-enumerable properties are always
  ignored as implied by the documentation.

It also clarifies the handling of `Date` values:

- Previously, passing an invalid `Date` object to `equals` would throw an
  exception. Invalid `Date`s are now equal to each other and unequal to any
  other `Date`.

## 0.2.0 (2025-08-18)

This release changes how zeroes and `NaN`s are compared.

- `0` is now considered different from `-0`.
- `NaN` is now considered equal to `NaN`.

## 0.1.2 (2025-08-17)

This patch release simplifies the way `equals()` compares object prototypes.

## 0.1.1 (2025-08-17)

This patch release exports the same code as v0.1.0, but removes test files
from the package.

## 0.1.0 (2025-08-17)

This initial release includes an `equals` function that deeply compares objects
and arrays, based on the algorithm used in `@benchristel/taste`.
