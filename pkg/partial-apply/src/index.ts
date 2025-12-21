/**
 * @module partial-apply
 */

import {
    type FunctionProvenance,
    trackProvenance,
} from "@longlast/function-provenance";

/**
 * A partially-applied function.
 */

export interface PartiallyApplied<Rest extends any[], Return>
    extends FunctionProvenance {
    (...rest: Rest): Return;
}

export function partialApply<Arg, Rest extends any[], Return>(
    arg: Arg,
    f: (a: Arg, ...rest: Rest) => Return,
): PartiallyApplied<Rest, Return>;

export function partialApply<Arg>(
    arg: Arg,
    f?: never,
): <Rest extends any[], Return>(
    f: (arg: Arg, ...rest: Rest) => Return,
) => PartiallyApplied<Rest, Return>;

/**
 * Binds the first argument to a function, returning a new function that takes
 * the remaining arguments.
 *
 * `partialApply` is [curried]. See {@link curry}.
 *
 * [curried]: https://wiki.haskell.org/Currying
 *
 * @example
 * ```ts
 * const concat = (a: string, b: string) => a + b;
 *
 * const toUsername = partialApply("@", concat);
 *
 * toUsername("elias"); // => "@elias"
 * ```
 *
 * ## Manual currying
 *
 * Due to limitations of TypeScript, longlast's {@link curry} function does not
 * support currying functions with [type parameters]. You can, however, use
 * `partialApply` to create manually curried functions with type parameters, as
 * in the following example:
 *
 * [type parameters]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#type-parameters
 *
 * ```ts
 * // Two-argument signature
 * function filter<T>(
 *     callback: (elem: T) => boolean,
 *     array: T[],
 * ): T[];
 *
 * // One-argument signature
 * function filter<T>(
 *     callback: (elem: T) => boolean,
 *     _?: never,
 * ): (array: T[]) => T[];
 *
 * // Implementation
 * function filter(callback: any, array?: any): any {
 *     if (arguments.length === 1) {
 *         return partialApply(callback, filter);
 *     }
 *
 *     return (array as any).filter(callback);
 * }
 * ```
 *
 * Note the second parameter in the "one-argument signature," `_?: never`. Its
 * purpose is to prevent the function being called with a second argument of
 * the wrong type.
 *
 * A downside of this approach is that the implementation of the function is
 * not typesafe, and you must write each call signature yourself.
 */

export function partialApply(arg: any, f: any): any {
    if (arguments.length === 1) {
        // recursionception
        return partialApply(arg, partialApply);
    }

    return trackProvenance(f, [arg], f.bind(null, arg));
}
