# `@longlast/symbols`

This package only exports unique symbols, for use e.g. as the method names of
ubiquitous interfaces.

It does _not_ export anything else, including the ubiquitous interfaces
themselves. The purpose of this restriction is to minimize the chance of
breaking changes. **There can be only one** instance of `@longlast/symbols` in
any app bundle; if two packages import different versions of
`@longlast/symbols`, then they will not be able to call each others' methods.
Packages that depend on `@longlast/symbols` should _always_ write their version
specifiers to get the latest 1.x version, e.g. `^1.0.0`.
