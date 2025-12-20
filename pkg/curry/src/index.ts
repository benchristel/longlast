/**
 * @module curry
 */

import {
    type FunctionProvenance,
    getBoundArguments as getArgs,
    getUnapplied,
} from "@longlast/function-provenance";
import {$getBoundArguments, $unapplied} from "@longlast/symbols";
import type {AnyFunction} from "@longlast/any-function";

/**
 * @param f - the function to curry
 * @typeParam A - the type of `f`'s first argument
 * @typeParam B - the type of `f`'s second argument
 * @typeParam C - the type of `f`'s third argument
 * @typeParam D - the type of `f`'s fourth argument
 * @typeParam E - the type of `f`'s fifth argument
 * @typeParam Return - the function's return type
 */

export function curry<A, B, Return>(
    f: (a: A, b: B) => Return,
): Curried2<A, B, Return>;

export function curry<A, B, C, Return>(
    f: (a: A, b: B, c: C) => Return,
): Curried3<A, B, C, Return>;

export function curry<A, B, C, D, Return>(
    f: (a: A, b: B, c: C, d: D) => Return,
): Curried4<A, B, C, D, Return>;

export function curry<A, B, C, D, E, Return>(
    f: (a: A, b: B, c: C, d: D, e: E) => Return,
): Curried5<A, B, C, D, E, Return>;

// TODO: (pre-1.0.0) document that the behavior of calling a curried function
// with no arguments is undefined.

/**
 * Returns a [*curried*] version of the given function `f`. The returned
 * function behaves just like `f`, except that, if is passed fewer arguments
 * than `f` requires, it does nothing but return a new curried function that
 * takes the remaining arguments. `f` is called once all arguments have been
 * supplied.
 *
 * [*curried*]: https://wiki.haskell.org/Currying
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
 *
 * ## Limitations
 *
 * - The types for `curry` only support functions of up to five arguments.
 * - Functions with [rest parameters] (e.g. `...args`) or optional parameters
 *   are not supported. The [`arguments`] object is not supported either. You
 *   should only curry functions that have a fixed number of named parameters.
 * - Functions with [type parameters] are not supported.
 *
 * [rest parameters]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
 * [`arguments`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
 * [type parameters]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#type-parameters
 */

export function curry(f: AnyFunction): AnyFunction {
    // Optimize the common cases -- functions with 2 and 3 parameters. This
    // provides a 50x speedup!
    switch (f.length) {
        case 2:
            return setDisplayName(curry2(f), getName(f));
        case 3:
            return setDisplayName(curry3(f), getName(f));
        default:
            return setDisplayName(curryVarargs(f), getName(f));
    }
}

function curry2(f: AnyFunction): AnyFunction {
    return function curried(a: any, b: any) {
        switch (arguments.length) {
            case 1:
                return trackProvenance(curried, [a], f.bind(null, a));
            default:
                return f(a, b);
        }
    };
}

function curry3(f: AnyFunction): AnyFunction {
    return function curried(a: any, b: any, c: any) {
        switch (arguments.length) {
            case 1:
                return trackProvenance(curried, [a], curry2(f.bind(null, a)));
            case 2:
                return trackProvenance(curried, [a, b], f.bind(null, a, b));
            default:
                return f(a, b, c);
        }
    };
}

function curryVarargs(f: AnyFunction): AnyFunction {
    return function curried(...args: any[]): any {
        if (args.length < f.length) {
            return trackProvenance(curried, args, curried.bind(null, ...args));
        } else {
            return f(...args);
        }
    };
}

function setDisplayName(curried: any, name: string) {
    curried.displayName = name;
    return curried;
}

function trackProvenance(source: any, args: any[], destination: any) {
    destination.displayName = getName(source);
    destination[$getBoundArguments] = () => getArgs(source).concat(args);
    destination[$unapplied] = getUnapplied(source);
    return destination;
}

// TODO: duplicated in partial-apply.
// Use functionName instead.
function getName(f: any): string {
    return f.displayName ?? f.name;
}

/**
 * A one-argument (unary) function created by partially applying a curried
 * function.
 *
 * @typeParam A - the type of the function's argument
 * @typeParam Return - the function's return type
 */

export interface Curried1<A, Return> extends FunctionProvenance {
    (a: A): Return;
}

/**
 * A two-argument (binary) curried function.
 *
 * @typeParam A - the type of the function's first argument
 * @typeParam B - the type of the function's second argument
 * @typeParam Return - the function's return type
 */

export interface Curried2<A, B, Return> extends FunctionProvenance {
    (a: A, b: B): Return;
    (a: A, b?: never): Curried1<B, Return>;
}

/**
 * A three-argument curried function.
 *
 * @typeParam A - the type of the function's first argument
 * @typeParam B - the type of the function's second argument
 * @typeParam C - the type of the function's third argument
 * @typeParam Return - the function's return type
 */

export interface Curried3<A, B, C, Return> extends FunctionProvenance {
    (a: A, b: B, c: C): Return;
    (a: A, b: B, c?: never): Curried1<C, Return>;
    (a: A, b?: never, c?: never): Curried2<B, C, Return>;
}

/**
 * A four-argument curried function.
 *
 * @typeParam A - the type of the function's first argument
 * @typeParam B - the type of the function's second argument
 * @typeParam C - the type of the function's third argument
 * @typeParam D - the type of the function's fourth argument
 * @typeParam Return - the function's return type
 */

export interface Curried4<A, B, C, D, Return> extends FunctionProvenance {
    (a: A, b: B, c: C, d: D): Return;
    (a: A, b: B, c: C, d?: never): Curried1<D, Return>;
    (a: A, b: B, c?: never, d?: never): Curried2<C, D, Return>;
    (a: A, b?: never, c?: never, d?: never): Curried3<B, C, D, Return>;
}

/**
 * A five-argument curried function.
 *
 * @typeParam A - the type of the function's first argument
 * @typeParam B - the type of the function's second argument
 * @typeParam C - the type of the function's third argument
 * @typeParam D - the type of the function's fourth argument
 * @typeParam E - the type of the function's fifth argument
 * @typeParam Return - the function's return type
 */

export interface Curried5<A, B, C, D, E, Return> extends FunctionProvenance {
    (a: A, b: B, c: C, d: D, e: E): Return;
    (a: A, b: B, c: C, d: D, e?: never): Curried1<E, Return>;
    (a: A, b: B, c: C, d?: never, e?: never): Curried2<D, E, Return>;
    (a: A, b: B, c?: never, d?: never, e?: never): Curried3<C, D, E, Return>;
    // prettier-ignore
    (a: A, b?: never, c?: never, d?: never, e?: never): Curried4<B, C, D, E, Return>;
}
