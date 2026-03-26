/**
 * @module result
 */

export function success<T>(value: T): Success<T> {
    return new Success(value);
}

export class Success<T> {
    public value: T;

    constructor(value: T) {
        this.value = value;
    }
}
