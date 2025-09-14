# `@longlast/curry`

Creates curried functions.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/curry
pnpm add @longlast/curry
yarn add @longlast/curry
```

## Use

```ts
import {curry} from "@longlast/curry";

const multiply = curry((a: number, b: number) => a * b);

[1, 2, 3].map(multiply(2)); // => [2, 4, 6]

multiply(3, 4); // => 12
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/curry/

## Performance

`@longlast/curry` is the fastest `curry` implementation on the market. Here are
some benchmark results (incrementing 100 numbers with
`array.map(curriedAdd(1))`):

```
inline function | #################################### . 7,110,624 ops/sec ±0.43%
@longlast/curry | ################################# . 6,628,769 ops/sec ±0.57%
ramda           | # . 204,623 ops/sec ±0.49%
lodash          | # . 170,245 ops/sec ±0.26%
```
