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
