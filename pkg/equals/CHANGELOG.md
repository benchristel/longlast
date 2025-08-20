# @longlast/equals

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
