/**
 * @module result
 */

export type Result<T, F> = Success<T> | Failure<F>;

interface ResultMethods<T, F> {
    isSuccess(): this is Success<T>;
    isFailure(): this is Failure<F>;
    mapSuccess<U>(f: (value: T) => U): Result<U, F>;
    mapFailure<G>(f: (detail: F) => G): Result<T, G>;
    flatMapSuccess<U, G>(f: (value: T) => Result<U, G>): Result<U, F | G>;
    flatMapFailure<U, G>(f: (detail: F) => Result<U, G>): Result<T | U, G>;
    orThrow(toError: (detail: F) => Error): T;
}

export function success<T>(value: T): Success<T> {
    return new Success(value);
}

export function failure<F>(detail: F): Failure<F> {
    return new Failure(detail);
}

export function assertSuccess<T, F>(
    result: Result<T, F>,
): asserts result is Success<T> {
    if (!result.isSuccess()) {
        throw "assertSuccess: unexpected failure";
    }
}

export function assertFailure<T, F>(
    result: Result<T, F>,
): asserts result is Failure<F> {
    if (!result.isFailure()) {
        throw "assertFailure: unexpected success";
    }
}

export function isSuccess<T, F>(result: Result<T, F>): result is Success<T> {
    return result.isSuccess();
}

export function isFailure<T, F>(result: Result<T, F>): result is Failure<F> {
    return result.isFailure();
}

export function mapSuccess<T, F, U>(
    f: (value: T) => U,
): (result: Result<T, F>) => Result<U, F> {
    return (result) => result.mapSuccess(f);
}

export function mapFailure<T, F, G>(
    f: (detail: F) => G,
): (result: Result<T, F>) => Result<T, G> {
    return (result) => result.mapFailure(f);
}

export function flatMapSuccess<T, F, U, G>(
    f: (value: T) => Result<U, G>,
): (result: Result<T, F>) => Result<U, F | G> {
    return (result) => result.flatMapSuccess(f);
}

export function flatMapFailure<T, F, U, G>(
    f: (detail: F) => Result<U, G>,
): (result: Result<T, F>) => Result<T | U, G> {
    return (result) => result.flatMapFailure(f);
}

export function orThrow<T, F>(
    toError: (detail: F) => Error,
): (result: Result<T, F>) => T {
    return (result) => result.orThrow(toError);
}

export class Success<T> implements ResultMethods<T, never> {
    public readonly type = "success" as const;
    public readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    isSuccess(): this is Success<T> {
        return true;
    }

    isFailure(): this is Failure<never> {
        return false;
    }

    mapSuccess<U>(f: (value: T) => U): Success<U> {
        return success(f(this.value));
    }

    mapFailure<G>(_f: (value: never) => G): Success<T> {
        return this;
    }

    flatMapSuccess<U, G>(f: (value: T) => Result<U, G>): Result<U, G> {
        return f(this.value);
    }

    flatMapFailure<U, G>(
        _f: (detail: never) => Result<U, G>,
    ): Result<T, never> {
        return this;
    }

    orThrow(_: (detail: never) => Error): T {
        return this.value;
    }
}

export class Failure<F> implements ResultMethods<never, F> {
    public readonly type = "failure" as const;
    public readonly detail: F;

    constructor(detail: F) {
        this.detail = detail;
    }

    isSuccess(): this is Success<never> {
        return false;
    }

    isFailure(): this is Failure<F> {
        return true;
    }

    mapSuccess(_f: (value: never) => unknown): Failure<F> {
        return this;
    }

    mapFailure<G>(f: (detail: F) => G): Failure<G> {
        return failure(f(this.detail));
    }

    flatMapSuccess<U, G>(_f: (value: never) => Result<U, G>): Result<never, F> {
        return this;
    }

    flatMapFailure<U, G>(f: (detail: F) => Result<U, G>): Result<U, G> {
        return f(this.detail);
    }

    orThrow(toError: (detail: F) => Error): never {
        throw toError(this.detail);
    }
}
