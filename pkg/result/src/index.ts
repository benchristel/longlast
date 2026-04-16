/**
 * @module result
 */

export type Result<T, F> = Success<T> | Failure<F>;

export interface ResultMethods<T, F> {
    isSuccess(): this is Success<T>;
    isFailure(): this is Failure<F>;
    mapSuccess<U>(f: (value: T) => U): Result<U, F>;
    flatMapSuccess<U, G>(f: (value: T) => Result<U, G>): Result<U, F | G>;
}

export function success<T>(value: T): Success<T> {
    return new Success(value);
}

export function failure<F>(detail: F): Failure<F> {
    return new Failure(detail);
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

    flatMapSuccess<U, G>(f: (value: T) => Result<U, G>): Result<U, G> {
        return f(this.value);
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

    flatMapSuccess<U, G>(_f: (value: never) => Result<U, G>): Result<never, F> {
        return this;
    }
}
