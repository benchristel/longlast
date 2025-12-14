/**
 * @module partial-apply
 */

/**
 * Binds the first argument to a function, returning a new function that takes
 * the remaining arguments.
 *
 * @example
 * ```ts
 * const concat = (a: string, b: string) => a + b;
 *
 * const toUsername = partialApply("@", concat);
 *
 * toUsername("elias"); // => "@elias"
 * ```
 */
export function partialApply<Arg, Rest extends any[], Return>(
    arg: Arg,
    f: (a: Arg, ...rest: Rest) => Return,
): (...rest: Rest) => Return {
    return f.bind(null, arg);
}
