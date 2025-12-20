# `@longlast/any-function`

A type representing any function, for use in type argument constraints.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/any-function
pnpm add @longlast/any-function
yarn add @longlast/any-function
```

## Use

```ts
import type {AnyFunction} from "@longlast/any-function"

function clearName<F extends AnyFunction>(f: F): F {
    Object.defineProperty(f, "name", {value: ""});
    return f;
}
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/reference/any-function/
