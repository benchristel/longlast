# @longlast/result

## 0.1.0 (2026-04-18)

Breaking change: `orThrow` has been removed.

This release also fixes type-level bugs in the functional API, where type
arguments were bound too early, resulting in `unknown` types.

## 0.0.2 (2026-04-17)

This release adds an `orThrow` method to Result.

It also adds functional equivalents of the Result methods: `isSuccess`,
`isFailure`, `mapSuccess`, `mapFailure`, `flatMapSuccess`, `flatMapFailure`,
and `orThrow`.

## 0.0.1 (2026-04-15)

This initial release exports a `Result` type with the following methods:

```ts
export interface ResultMethods<T, F> {
    isSuccess(): this is Success<T>;
    isFailure(): this is Failure<F>;
    mapSuccess<U>(f: (value: T) => U): Result<U, F>;
    mapFailure<G>(f: (detail: F) => G): Result<T, G>;
    flatMapSuccess<U, G>(f: (value: T) => Result<U, G>): Result<U, F | G>;
    flatMapFailure<U, G>(f: (detail: F) => Result<U, G>): Result<T | U, G>;
}
```

and four type-narrowing functions: `isSuccess`, `isFailure`, `assertSuccess`,
and `assertFailure`.
