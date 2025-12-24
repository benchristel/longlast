/**
 * @module flow
 */

interface Flow<T> {
    and<U>(f: (value: T) => U): Flow<U>;
    evaluate(): T;
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

    evaluate(): T {
        return this.value();
    }
}

export function startWith<T>(value: T): Flow<T> {
    return new LazyFlow(() => value);
}
