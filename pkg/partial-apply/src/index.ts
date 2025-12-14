/**
 * @module partial-apply
 */

import {$getBoundArguments, $unapplied} from "@longlast/symbols";
import {
    type FunctionProvenance,
    getBoundArguments,
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
 */

export function partialApply(arg: any, f: any): any {
    if (arguments.length === 1) {
        // recursionception
        return partialApply(arg, partialApply);
    }

    const applied = f.bind(null, arg);
    applied[$getBoundArguments] = () => getBoundArguments(f).concat([arg]);
    applied[$unapplied] = f;
    applied.displayName = getName(f);
    return applied;
}

// TODO: duplicated in curry.
function getName(f: any): string {
    return f.displayName ?? f.name;
}
