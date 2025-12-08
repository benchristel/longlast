/**
 * @module function-provenance
 * @hidden
 */

import {$getBoundArguments, $unapplied} from "@longlast/symbols";

declare const $nonUserConstructible: unique symbol;

export interface FunctionProvenance {
    [$getBoundArguments](): unknown[];
    [$unapplied]: AnyFunction;
    displayName: string;
    [$nonUserConstructible]: true;
}

// TODO: Move this type to its own package. Duplicated in `curry`.
type AnyFunction = (...args: any[]) => any;

export function getBoundArguments(f: AnyFunction): unknown[] {
    return (f as any)[$getBoundArguments]?.() ?? [];
}
