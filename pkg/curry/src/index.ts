/**
 * @module curry
 */

// TODO: move this type to its own package
type AnyFunction = (...args: any[]) => any;

type Func2<A, B, Out> = (a: A, b: B) => Out;
type Func3<A, B, C, Out> = (a: A, b: B, c: C) => Out;
type Func4<A, B, C, D, Out> = (a: A, b: B, c: C, d: D) => Out;
type Func5<A, B, C, D, E, Out> = (a: A, b: B, c: C, d: D, e: E) => Out;

// TODO: make these types non-user-constructible
export interface Curried2<A, B, Out> {
    (a: A, b: B): Out;
    (a: A): (b: B) => Out;
}

export interface Curried3<A, B, C, Out> {
    (a: A, b: B, c: C): Out;
    (a: A, b: B): (c: C) => Out;
    (a: A): Curried2<B, C, Out>;
}

export interface Curried4<A, B, C, D, Out> {
    (a: A, b: B, c: C, d: D): Out;
    (a: A, b: B, c: C): (d: D) => Out;
    (a: A, b: B): Curried2<C, D, Out>;
    (a: A): Curried3<B, C, D, Out>;
}

export interface Curried5<A, B, C, D, E, Out> {
    (a: A, b: B, c: C, d: D, e: E): Out;
    (a: A, b: B, c: C, d: D): (e: E) => Out;
    (a: A, b: B, c: C): Curried2<D, E, Out>;
    (a: A, b: B): Curried3<C, D, E, Out>;
    (a: A): Curried4<B, C, D, E, Out>;
}

/**
 * Returns a *curried* version of the given function `f`. The returned function
 * behaves just like `f`, except that, if is passed fewer arguments than `f`
 * requires, it does nothing but return a new function that takes the remaining
 * arguments. `f` is called once all arguments have been supplied.
 */

export function curry<A, B, Out>(f: Func2<A, B, Out>): Curried2<A, B, Out>;

export function curry<A, B, C, Out>(
    f: Func3<A, B, C, Out>,
): Curried3<A, B, C, Out>;

export function curry<A, B, C, D, Out>(
    f: Func4<A, B, C, D, Out>,
): Curried4<A, B, C, D, Out>;

export function curry<A, B, C, D, E, Out>(
    f: Func5<A, B, C, D, E, Out>,
): Curried5<A, B, C, D, E, Out>;

export function curry(f: AnyFunction): AnyFunction {
    switch (f.length) {
        case 2:
            return curry2(f);
        case 3:
            return curry3(f);
        default:
            return curryVarargs(f);
    }
}

function curry2(f: AnyFunction): AnyFunction {
    return function curried(a: any, b: any): AnyFunction {
        switch (arguments.length) {
            // TODO: test and implement zero-args case
            case 1:
                return (b: any) => f(a, b);
            default:
                return f(a, b);
        }
    };
}

function curry3(f: AnyFunction): AnyFunction {
    return function curried(a: any, b: any, c: any): AnyFunction {
        switch (arguments.length) {
            // TODO: test and implement zero-args case
            case 1:
                return curry2((b: any, c: any) => f(a, b, c));
            case 2:
                return (c: any) => f(a, b, c);
            default:
                return f(a, b, c);
        }
    };
}

export function curryVarargs(f: AnyFunction): AnyFunction {
    return function curried(...args: any[]) {
        if (args.length < f.length) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs);
        } else {
            return f(...args);
        }
    };
}
