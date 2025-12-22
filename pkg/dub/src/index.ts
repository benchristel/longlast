/**
 * @module dub
 */

import {type AnyFunction} from "@longlast/any-function";
import {setFunctionName} from "@longlast/function-name";
import {partialApply} from "@longlast/partial-apply";

export function dub<F extends AnyFunction>(name: string, f: F): F;
export function dub(name: string): <F extends AnyFunction>(f: F) => F;

/**
 * Assigns the `name` to the given function. Note that this is a mutating
 * operation!
 *
 * `dub` is curried.
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

export function dub<F extends AnyFunction>(
    name: string,
    f?: F,
): F | ((f: any) => any) {
    if (f == null) {
        return partialApply(name, dub);
    }
    return setFunctionName(name, f);
}
