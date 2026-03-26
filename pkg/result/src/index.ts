/**
 * @module result
 */

export type Result<T, F> = Success<T> | Failure<F>;

export interface ResultMethods<T> {
    isSuccess(): this is Success<T>;
}

export function success<T>(value: T): Success<T> {
    return new Success(value);
}

export function failure<F>(detail: F): Failure<F> {
    return new Failure(detail);
}

export class Success<T> implements ResultMethods<T> {
    public readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    isSuccess(): this is Success<T> {
        return true;
    }
}

export class Failure<F> implements ResultMethods<never> {
    public readonly detail: F;

    constructor(detail: F) {
        this.detail = detail;
    }

    isSuccess(): this is Success<never> {
        return false;
    }
}
