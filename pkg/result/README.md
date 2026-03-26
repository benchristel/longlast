# `@longlast/result`

Represents the outcome of an operation that can fail.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/result
pnpm add @longlast/result
yarn add @longlast/result
```

## Use

```ts
import {type Result, failure, success} from "@longlast/result";

function first<T>(array: T[]): Result<T, Error> {
    if (array.length === 0) {
        return failure(Error("empty array"));
    }

    return success(array[0]);
}

const increment = (n: number) => n + 1;

first([1]).mapSuccess(increment); // => Success(2)

first([]).mapSuccess(increment); // => Failure(Error("empty array"))

first([1]).orThrow(); // => 1
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/reference/result/
