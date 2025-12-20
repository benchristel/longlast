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
    [$unapplied]: UnknownFunction;
    displayName: string;
    [$nonUserConstructible]: true;
}

export function getBoundArguments(f: AnyFunction): unknown[] {
    return (f as any)[$getBoundArguments]?.() ?? [];
}

export function getUnapplied(f: AnyFunction): UnknownFunction {
    return (f as any)[$unapplied] ?? f;
}

// TODO: Move UnknownFunction to its own package
type UnknownFunction = (...args: never) => unknown;
