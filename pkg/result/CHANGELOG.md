# @longlast/result

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
