/**
 * @module curry
 */

export function curry<A, B, Out>(f: (a: A, b: B) => Out): Curried2<A, B, Out>;

export function curry<A, B, C, Out>(
    f: (a: A, b: B, c: C) => Out,
): Curried3<A, B, C, Out>;

export function curry<A, B, C, D, Out>(
    f: (a: A, b: B, c: C, d: D) => Out,
): Curried4<A, B, C, D, Out>;

export function curry<A, B, C, D, E, Out>(
    f: (a: A, b: B, c: C, d: D, e: E) => Out,
): Curried5<A, B, C, D, E, Out>;

/**
 * Returns a *curried* version of the given function `f`. The returned function
 * behaves just like `f`, except that, if is passed fewer arguments than `f`
 * requires, it does nothing but return a new function that takes the remaining
 * arguments. `f` is called once all arguments have been supplied.
 *
 * @example
 * ```ts
 * import {curry} from "@longlast/curry";
 *
 * const multiply = curry((a: number, b: number) => a * b);
 *
 * // `multiply` can be called normally, with both arguments...
 * multiply(3, 4); // => 12
 *
 * // ...or it can be partially applied:
 * [1, 2, 3].map(multiply(2)); // => [2, 4, 6]
 * ```
 */

export function curry(f: AnyFunction): AnyFunction {
    // Optimize the common cases -- functions with 2 and 3 parameters. This
    // provides a 50x speedup!
    switch (f.length) {
        case 2:
            return curry2(f);
        case 3:
            return curry3(f);
        default:
            return curryVarargs(f);
    }
}

export interface Curried2<A, B, Out> {
    (a: A, b: B): Out;
    (a: A): (b: B) => Out;
    /** @hidden */
    [$nonUserConstructible]: true;
}

export interface Curried3<A, B, C, Out> {
    (a: A, b: B, c: C): Out;
    (a: A, b: B): (c: C) => Out;
    (a: A): Curried2<B, C, Out>;
    /** @hidden */
    [$nonUserConstructible]: true;
}

export interface Curried4<A, B, C, D, Out> {
    (a: A, b: B, c: C, d: D): Out;
    (a: A, b: B, c: C): (d: D) => Out;
    (a: A, b: B): Curried2<C, D, Out>;
    (a: A): Curried3<B, C, D, Out>;
    /** @hidden */
    [$nonUserConstructible]: true;
}

export interface Curried5<A, B, C, D, E, Out> {
    (a: A, b: B, c: C, d: D, e: E): Out;
    (a: A, b: B, c: C, d: D): (e: E) => Out;
    (a: A, b: B, c: C): Curried2<D, E, Out>;
    (a: A, b: B): Curried3<C, D, E, Out>;
    (a: A): Curried4<B, C, D, E, Out>;
    /** @hidden */
    [$nonUserConstructible]: true;
}

declare const $nonUserConstructible: unique symbol;

function curry2(f: AnyFunction): AnyFunction {
    return function curried(a: any, b: any): AnyFunction {
        switch (arguments.length) {
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
            case 1:
                return curry2((b: any, c: any) => f(a, b, c));
            case 2:
                return (c: any) => f(a, b, c);
            default:
                return f(a, b, c);
        }
    };
}

function curryVarargs(f: AnyFunction): AnyFunction {
    return function curried(...args: any[]) {
        if (args.length < f.length) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs);
        } else {
            return f(...args);
        }
    };
}

// TODO: move this type to its own package
type AnyFunction = (...args: any[]) => any;
