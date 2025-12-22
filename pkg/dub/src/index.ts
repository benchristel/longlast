/**
 * @module dub
 */

import {type AnyFunction} from "@longlast/any-function";

/**
 * Assigns the `name` to the `displayName` property of the given function. Note
 * that this is a mutating operation!
 *
 * @example
 * ```ts
 * import {dub} from "@longlast/dub";
 * import {curry} from "@longlast/curry";
 * import {getFunctionName} from "@longlast/function-name";
 *
 * const add = dub(
 *     "add",
 *     curry((a: number, b: number) => a + b),
 * );
 *
 * getFunctionName(add); // => "add"
 * ```
 */

export function dub<F extends AnyFunction>(name: string, f: F): F {
    (f as any).displayName = name;
    return f;
}
