/**
 * @module equals
 */

import {curry, type Curried2} from "@longlast/curry";
import {$boundArguments, $unapplied} from "@longlast/symbols";

/**
 * @function
 * Deeply compares two values, returning true if they're equal and false
 * otherwise. The following criteria are used to determine equality:
 *
 *   - All values are always equal to themselves.
 *   - Primitives `a` and `b` are equal iff `Object.is(a, b)`. This is similar
 *     to `===` comparison, but treats `NaN` as equal to `NaN` and `0` as
 *     different from `-0`.
 *   - Dates are equal iff they have the same millisecond-precision timestamp.
 *   - RegExps are equal iff they have the same pattern and flags.
 *   - Errors are equal iff they have the same class and message.
 *   - Arrays are equal iff they have the same length and their corresponding
 *     elements are equal (according to `equals`).
 *   - Sets are equal iff they contain the same elements. Note that set
 *     elements are _not_ deeply compared.
 *   - Partially applied curried functions are equal iff they originate from
 *     the same curried function and their bound arguments are equal
 *     according to `equals`. See {@link curry}.
 *   - Other objects are equal iff they have the same prototype (e.g. the same
 *     class) and the same set of enumerable string-keyed properties, and the
 *     values of their corresponding properties are equal (according to
 *     `equals`).
 *
 * `equals()` can throw a `RangeError` if one of its arguments contains a
 * reference cycle. Avoid passing mutable objects to `equals()` unless you know
 * that they do not contain cycles.
 *
 * `equals()` is curried.
 */

export const equals: Curried2<unknown, unknown, boolean> = curry(_equals);

function _equals(a: unknown, b: unknown): boolean {
    // This is an optimized implementation. There is a simpler, equivalent one
    // in pkg/equals/alt/reference.ts.
    if (Object.is(a, b)) {
        return true;
    }
    if (a instanceof Date && b instanceof Date) {
        return Object.is(+a, +b);
    }
    if (a instanceof RegExp && b instanceof RegExp) {
        return String(a) === String(b);
    }
    if (a instanceof Error && b instanceof Error) {
        return (
            a.message === b.message &&
            Object.getPrototypeOf(a) === Object.getPrototypeOf(b)
        );
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((_, i) => _equals(a[i], b[i]));
    }
    if (a instanceof Set && b instanceof Set) {
        return a.size === b.size && [...a].every((v) => b.has(v));
    }
    if (typeof a === "function" && typeof b === "function") {
        const aArgs = (a as any)[$boundArguments];
        const bArgs = (b as any)[$boundArguments];
        const aUnapplied = (a as any)[$unapplied];
        const bUnapplied = (b as any)[$unapplied];
        return (
            aUnapplied != null &&
            aUnapplied === bUnapplied &&
            _equals(aArgs, bArgs)
        );
    }
    if (a && b && typeof a === "object" && protoOf(a) === protoOf(b)) {
        const bKeys = new Set(Object.keys(b));
        for (const key of Object.keys(a)) {
            if (!bKeys.has(key)) {
                return false;
            }
            if (!_equals((a as any)[key], (b as any)[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

const protoOf = Object.getPrototypeOf;
