/**
 * @module function-provenance
 * @hidden
 */

import type {$getBoundArguments, $unapplied} from "@longlast/symbols";

declare const $nonUserConstructible: unique symbol;

export interface FunctionProvenance {
    [$getBoundArguments](): unknown[];
    [$unapplied]: AnyFunction;
    displayName: string;
    [$nonUserConstructible]: true;
}

// TOOD: Move this type to its own package. Duplicated in `curry`.
type AnyFunction = (...args: any[]) => any;
