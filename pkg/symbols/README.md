# `@longlast/symbols`

This package exports unique symbols, for use e.g. as the method names of
ubiquitous interfaces.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/symbols
pnpm add @longlast/symbols
yarn add @longlast/symbols
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/symbols/

## Development

This package _only_ exports symbols. It does _not_ export anything else,
including types. The purpose of this restriction is to minimize the chance of
breaking changes. **There can be only one** instance of `@longlast/symbols` in
any app bundle; if two packages import different versions of
`@longlast/symbols`, then they will not be able to call each others' methods.
Packages that depend on `@longlast/symbols` should _always_ write their version
specifiers to get the latest 1.x version, e.g. `^1.0.0`.
