/**
 * @module flow
 */

type Lazy<T> = () => T;

class LazyFlow<T> {
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

export function startWith<T>(value: T): LazyFlow<T> {
    return new LazyFlow(() => value);
}
