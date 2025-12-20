/**
 * @module function-provenance
 * @hidden
 */

import {$getBoundArguments, $unapplied} from "@longlast/symbols";
import type {AnyFunction} from "@longlast/any-function";

declare const $nonUserConstructible: unique symbol;

export interface FunctionProvenance {
    [$getBoundArguments](): unknown[];
    // TODO: (pre-1.0.0) Should these properties be readonly?
    // TODO: (pre-1.0.0) Avoid using `any` types in [$unapplied].
    [$unapplied]: AnyFunction;
    displayName: string;
    [$nonUserConstructible]: true;
}

export function getBoundArguments(f: AnyFunction): unknown[] {
    return (f as any)[$getBoundArguments]?.() ?? [];
}

// TODO: (pre-1.0.0) Avoid returning `AnyFunction`. Use `UnknownFunction`:
// type UnknownFunction = (...args: never) => unknown;
export function getUnapplied(f: AnyFunction): AnyFunction {
    return (f as any)[$unapplied] ?? f;
}
