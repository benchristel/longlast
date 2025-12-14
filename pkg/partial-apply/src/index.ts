/**
 * @module partial-apply
 */

import {$getBoundArguments, $unapplied} from "@longlast/symbols";
import {
    type FunctionProvenance,
    getBoundArguments,
} from "@longlast/function-provenance";

export interface PartiallyApplied<Rest extends any[], Return>
    extends FunctionProvenance {
    (...rest: Rest): Return;
}

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
): PartiallyApplied<Rest, Return> {
    const applied = f.bind(null, arg) as PartiallyApplied<Rest, Return>;
    applied[$getBoundArguments] = () => getBoundArguments(f).concat([arg]);
    applied[$unapplied] = f;
    applied.displayName = getName(f);
    return applied;
}

// TODO: duplicated in curry.
function getName(f: any): string {
    return f.displayName ?? f.name;
}
