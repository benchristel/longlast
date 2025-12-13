# `@longlast/pipe`

Composes functions left-to-right.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/pipe
pnpm add @longlast/pipe
yarn add @longlast/pipe
```

## Use

```ts
import {pipe} from "@longlast/pipe";

const split = (pattern) => (str) => str.split(pattern);
const map = (f) => (array) => array.map((elem) => f(elem));
const join = (delim) => (strs) => strs.join(delim);

const capitalize = pipe(
    split(""),
    updateAt(0, upcase),
    join(""),
)

const camelCase = pipe(
    split(/\W+/),
    map(capitalize),
    join(""),
);

camelCase("chunky-bacon") // => "ChunkyBacon"
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/pipe/
