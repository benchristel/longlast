# @longlast/equals

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
