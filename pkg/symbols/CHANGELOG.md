# @longlast/symbols

## 1.1.1 (2025-12-15)

The documentation for Longlast has been split into a handbook and a reference
section. This patch release just updates the documentation link in the readme
to point to the new location of the reference docs.

## 1.1.0 (2025-09-07)

There's now a new `$getBoundArguments` symbol, and the old `$boundArguments` is
deprecated.

The purpose of the change is to optimize the performance of `curry`. In
benchmark tests, I found that building the arguments array when partially
applying a curried function is somewhat slow, and that calls can be sped up
significantly by building the array only on demand. `[$getBoundArguments]` is
the planned name for the method that gets the arguments of a partially applied
curried function.

## 1.0.1 (2025-09-05)

This release just updates the `package.json` file to link to the project
homepage.

## 1.0.0 (2025-09-01)

This is the first stable release of `@longlast/symbols`! There are no changes
in this release; the code is substantively the same as `0.0.5` and
`1.0.0-rc.1`.

### Breaking changes

If you install version `1.x.x` of `@longlast/symbols`, _all_ packages in your
project must be upgraded to also depend on a `1.x.x` version. If multiple 
versions of `@longlast/symbols` are installed, stuff will break.

## 1.0.0-rc.1 (2025-09-01)

This release updates documentation and makes internal improvements in
preparation for the 1.0.0 release.

## 0.0.5 (2025-08-30)

This release adds an `$unapplied` symbol for use by curried functions.

## 0.0.4 (2025-08-30)

This release adds a `$boundArguments` symbol for use by curried functions.

## 0.0.3 (2025-08-27)

This release just adds installation instructions to the readme file.

## 0.0.2 (2025-08-27)

This release only updates metadata in `package.json`.

## 0.0.1 (2025-08-12)

This is a test release. There are no changes in this release.

## 0.0.0 (2025-08-12)

This is a test release to try out the release process.
`@longlast/symbols@0.0.0` exports a single constant, `$equals`, which is a
unique symbol.
