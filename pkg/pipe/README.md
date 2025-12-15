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
const mapAt = (idx, f) => (array) => array.map((e, i) => i === idx ? f(e) : e);
const join = (delim) => (strs) => strs.join(delim);
const toUpperCase = (s) => s.toUpperCase();

const capitalize = pipe(
    split(""),
    mapAt(0, toUpperCase),
    join(""),
)

const pascalCase = pipe(
    split(/\W+/),
    map(capitalize),
    join(""),
);

pascalCase("chunky-bacon") // => "ChunkyBacon"
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/reference/pipe/
