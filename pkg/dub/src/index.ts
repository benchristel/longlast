/**
 * @module dub
 */

/**
 * Assigns the `name` to the `displayName` property of the given function. Note
 * that this is a mutating operation!
 *
 * @example
 * ```ts
 * import {dub} from "@longlast/dub";
 * import {curry} from "@longlast/curry";
 * import {functionName} from "@longlast/functionName";
 *
 * const add = dub(
 *     "add",
 *     curry((a: number, b: number) => a + b),
 * );
 *
 * functionName(add); // => "add"
 * ```
 */

export function dub<F extends AnyFunction>(name: string, f: F): F {
    // TODO: Should we set the `name` property here? It's configurable in ES6.
    // Are there performance concerns with doing that?
    // Maybe there's no perf problem as long as `dub` is not called by `curry`,
    // `partialApply`, etc. Do those functions really need to set the name if
    // they set `$unapplied`?
    // See: https://github.com/facebook/react/issues/20838
    (f as any).displayName = name;
    return f;
}

// TODO: duplicated
type AnyFunction = (...args: any[]) => any;
