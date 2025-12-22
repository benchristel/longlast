# `@longlast/dub`

Gives a function a durable name, immune to minification.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/dub
pnpm add @longlast/dub
yarn add @longlast/dub
```

## Use

```ts
import {dub} from "@longlast/dub";
import {curry} from "@longlast/curry";
import {getFunctionName} from "@longlast/function-name";

const add = dub(
    "add",
    curry((a: number, b: number) => a + b),
);

getFunctionName(add); // => "add"

// `dub` can also be partially applied.
const multiply = dub("multiply")(
    curry((a: number, b: number) => a * b),
);

getFunctionName(multiply); // => "multiply"
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/reference/dub/
