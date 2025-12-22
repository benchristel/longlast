/**
 * @module function-provenance
 * @hidden
 */

import {$getBoundArguments, $unapplied} from "@longlast/symbols";
import {getFunctionName} from "@longlast/function-name";
import type {AnyFunction} from "@longlast/any-function";

declare const $nonUserConstructible: unique symbol;

export interface FunctionProvenance {
    [$getBoundArguments](): unknown[];
    // TODO: (pre-1.0.0) Should these properties be readonly?
    [$unapplied]: UnknownFunction;
    displayName: string;
    [$nonUserConstructible]: true;
}

// TODO: Move UnknownFunction to its own package
type UnknownFunction = (...args: never) => unknown;

export function getBoundArguments(f: AnyFunction): unknown[] {
    return (f as any)[$getBoundArguments]?.() ?? [];
}

export function getUnapplied(f: AnyFunction): UnknownFunction {
    return (f as any)[$unapplied] ?? f;
}

/**
 * Transfers provenance information from the `source` function to `dest`, which
 * is assumed to be a partial application of `source`.
 *
 * @param args the arguments that were applied to create `dest` from `source`.
 */

export function trackProvenance<F extends AnyFunction>(
    source: UnknownFunction,
    args: readonly unknown[],
    dest: F,
): F {
    unsafeNarrow<F & FunctionProvenance>(dest);
    dest.displayName = getFunctionName(source);
    dest[$getBoundArguments] = () => getBoundArguments(source).concat(args);
    dest[$unapplied] = getUnapplied(source);
    return dest;
}

// TODO: unsafeNarrow is duplicated in equals.
function unsafeNarrow<T>(value: unknown): asserts value is T {
    value;
}
