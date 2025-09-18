/**
 * @module curry
 */

import {$getBoundArguments, $unapplied} from "@longlast/symbols";

/**
 * @param f - the function to curry
 * @typeParam A - the type of `f`'s first argument
 * @typeParam B - the type of `f`'s second argument
 * @typeParam C - the type of `f`'s third argument
 * @typeParam D - the type of `f`'s fourth argument
 * @typeParam E - the type of `f`'s fifth argument
 * @typeParam Return - the return type of `f`
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

export function curry(f) {
    function curried(a, b, c, d, e) {
        let arity = f.length;
        let args = arguments;
        let numArguments = args.length;
        let remaining = arity - numArguments;
        let next = curried;

        if (remaining <= 0) {
            return f(a, b, c, d, e);
        } else {
            if (remaining === 1) {
                next = f;
            }
            return copyMetadata(
                curried,
                args,
                !--numArguments
                    ? next.bind(null, a)
                    : !--numArguments
                      ? next.bind(null, a, b)
                      : !--numArguments
                        ? next.bind(null, a, b, c)
                        : next.bind(null, a, b, c, d),
            );
        }
    }
    return initMetadata(f, curried);
}

/**
 * A one-argument (unary) function created by partially applying a curried
 * function.
 *
 * This type only exists to declare the `displayName` property.
 *
 * @typeParam A - the type of the function's argument
 * @typeParam Return - the function's return type
 */

export interface Curried1<A, Return> {
    (a: A): Return;
    [$getBoundArguments](): unknown[];
    [$unapplied]: AnyFunction;
    displayName: string;

    /** @hidden */
    [$nonUserConstructible]: true;
}

/**
 * A two-argument (binary) curried function.
 *
 * @typeParam A - the type of `f`'s first argument
 * @typeParam B - the type of `f`'s second argument
 * @typeParam Return - the return type of `f`
 */

export interface Curried2<A, B, Return> {
    (a: A, b: B): Return;
    (a: A): Curried1<B, Return>;
    displayName: string;
    [$getBoundArguments](): unknown[];
    [$unapplied]: AnyFunction;

    /** @hidden */
    [$nonUserConstructible]: true;
}

/**
 * A three-argument curried function.
 *
 * @typeParam A - the type of `f`'s first argument
 * @typeParam B - the type of `f`'s second argument
 * @typeParam C - the type of `f`'s third argument
 * @typeParam Return - the return type of `f`
 */

export interface Curried3<A, B, C, Return> {
    (a: A, b: B, c: C): Return;
    (a: A, b: B): Curried1<C, Return>;
    (a: A): Curried2<B, C, Return>;
    displayName: string;
    [$getBoundArguments](): unknown[];
    [$unapplied]: AnyFunction;

    /** @hidden */
    [$nonUserConstructible]: true;
}

/**
 * A four-argument curried function.
 *
 * @typeParam A - the type of `f`'s first argument
 * @typeParam B - the type of `f`'s second argument
 * @typeParam C - the type of `f`'s third argument
 * @typeParam D - the type of `f`'s fourth argument
 * @typeParam Return - the return type of `f`
 */

export interface Curried4<A, B, C, D, Return> {
    (a: A, b: B, c: C, d: D): Return;
    (a: A, b: B, c: C): Curried1<D, Return>;
    (a: A, b: B): Curried2<C, D, Return>;
    (a: A): Curried3<B, C, D, Return>;
    displayName: string;
    [$getBoundArguments](): unknown[];
    [$unapplied]: AnyFunction;

    /** @hidden */
    [$nonUserConstructible]: true;
}

/**
 * A five-argument curried function.
 *
 * @typeParam A - the type of `f`'s first argument
 * @typeParam B - the type of `f`'s second argument
 * @typeParam C - the type of `f`'s third argument
 * @typeParam D - the type of `f`'s fourth argument
 * @typeParam E - the type of `f`'s fifth argument
 * @typeParam Return - the return type of `f`
 */

export interface Curried5<A, B, C, D, E, Return> {
    (a: A, b: B, c: C, d: D, e: E): Return;
    (a: A, b: B, c: C, d: D): Curried1<E, Return>;
    (a: A, b: B, c: C): Curried2<D, E, Return>;
    (a: A, b: B): Curried3<C, D, E, Return>;
    (a: A): Curried4<B, C, D, E, Return>;
    displayName: string;
    [$getBoundArguments](): unknown[];
    [$unapplied]: AnyFunction;

    /** @hidden */
    [$nonUserConstructible]: true;
}

declare const $nonUserConstructible: unique symbol;

function initMetadata(original: any, curried: any) {
    curried.displayName = getName(original);
    curried[$getBoundArguments] = () => [];
    curried[$unapplied] = curried;
    return curried;
}

function copyMetadata(source: any, args: IArguments, destination: any) {
    destination.displayName = getName(source);
    destination[$getBoundArguments] = () => [...getArgs(source), ...args];
    destination[$unapplied] = source[$unapplied];
    return destination;
}

function getName(f: any): string {
    return f.displayName ?? f.name;
}

function getArgs(f: any): unknown[] {
    return f[$getBoundArguments]() ?? [];
}

// TODO: move this type to its own package
type AnyFunction = (...args: any[]) => any;
