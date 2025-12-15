# `@longlast/equals`

Deeply compares objects.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/equals
pnpm add @longlast/equals
yarn add @longlast/equals
```

## Use

```ts
import {equals} from "@longlast/equals";

equals(
    [1, 2, {buckleMy: "shoe"}],
    [1, 2, {buckleMy: "shoe"}],
); // => true

equals(
    [1, 2, {buckleMy: "shoe"}],
    [3, 4, {openThe: "door"}],
); // => false
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/reference/equals/
