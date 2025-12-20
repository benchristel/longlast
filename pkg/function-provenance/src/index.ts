/**
 * @module function-provenance
 * @hidden
 */

import {$getBoundArguments, $unapplied} from "@longlast/symbols";

declare const $nonUserConstructible: unique symbol;

export interface FunctionProvenance {
    [$getBoundArguments](): unknown[];
    // TODO: (pre-1.0.0) Avoid using `any` types in [$unapplied].
    [$unapplied]: AnyFunction;
    displayName: string;
    [$nonUserConstructible]: true;
}

// TODO: Move this type to its own package. Duplicated in `curry`.
type AnyFunction = (...args: any[]) => any;

export function getBoundArguments(f: AnyFunction): unknown[] {
    return (f as any)[$getBoundArguments]?.() ?? [];
}

export function getUnapplied(f: AnyFunction): AnyFunction {
    return (f as any)[$unapplied] ?? f;
}
