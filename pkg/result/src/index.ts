/**
 * @module result
 */

export function success<T>(value: T): Success<T> {
    return new Success(value);
}

export function failure<F>(detail: F): Failure<F> {
    return new Failure(detail);
}

export class Success<T> {
    public readonly value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export class Failure<F> {
    public readonly detail: F;

    constructor(detail: F) {
        this.detail = detail;
    }
}
