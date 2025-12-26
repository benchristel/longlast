/**
 * @module flow
 */

/**
 * Creates a {@linkcode Flow} computation with the given value.
 */

export function startWith<T>(value: T): Flow<T> {
    return new LazyFlow(() => value);
}

declare const $nonUserConstructible: unique symbol;

/**
 * A computation built from a sequence of pure functions.
 *
 * Note that the `Flow` interface makes no guarantees about when the functions
 * will be called, or how many times they will be called.
 */

export interface Flow<T> {
    /**
     * Adds the given function to the end of the sequence. This does not modify
     * the current `Flow`; instead, it creates and returns a new instance.
     */
    and<U>(f: (value: T) => U): Flow<U>;
    /**
     * Returns the result of the computation.
     */
    result(): T;
    /** @hidden */
    [$nonUserConstructible]: true;
}

type Lazy<T> = () => T;

class LazyFlow<T> implements Flow<T> {
    private value: Lazy<T>;
    constructor(value: Lazy<T>) {
        this.value = value;
    }

    and<U>(f: (value: T) => U): LazyFlow<U> {
        return new LazyFlow(() => f(this.value()));
    }

    result(): T {
        return this.value();
    }

    declare [$nonUserConstructible]: true;
}
