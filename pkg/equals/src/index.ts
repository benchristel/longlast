/**
 * @module equals
 */

/**
 * Deeply compares two values, returning true if they're equal and false
 * otherwise. The following criteria are used to determine equality:
 *
 *   - All values are always equal to themselves.
 *   - Arrays are equal iff they have the same length and their corresponding
 *     elements are equal (according to `equals`).
 *   - Dates are equal iff they have the same millisecond-precision timestamp.
 *   - RegExps are equal iff they have the same pattern and flags.
 *   - Sets are equal iff they contain the same elements. Note that set
 *     elements are _not_ deeply compared.
 *   - Errors are equal iff they have the same class and message.
 *   - Other objects are equal iff they have the same prototype (e.g. the same
 *     class) and the same set of enumerable string-keyed properties, and the
 *     values of their corresponding properties are equal (according to
 *     `equals`).
 *   - Primitives `a` and `b` are equal iff `Object.is(a, b)`. This is similar
 *     to `===` comparison, but treats `NaN` as equal to `NaN` and `0` as
 *     different from `-0`.
 *
 * `equals()` can throw a `RangeError` if one of its arguments contains a
 * reference cycle. Avoid passing mutable objects to `equals()` unless you know
 * that they do not contain cycles.
 */
export function equals(a: unknown, b: unknown): boolean {
    if (Object.is(a, b)) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((_, i) => equals(a[i], b[i]));
    }
    if (a instanceof Date && b instanceof Date) {
        return Object.is(+a, +b);
    }
    if (a instanceof RegExp && b instanceof RegExp) {
        return String(a) === String(b);
    }
    if (a instanceof Set && b instanceof Set) {
        return equalSets(a, b);
    }
    if (a instanceof Error && b instanceof Error) {
        return (
            a.message === b.message &&
            Object.getPrototypeOf(a) === Object.getPrototypeOf(b)
        );
    }
    if (isObject(a) && isObject(b)) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        return (
            equalSets(new Set(aKeys), new Set(bKeys)) &&
            aKeys.every((k) => equals(a[k], b[k])) &&
            Object.getPrototypeOf(a) === Object.getPrototypeOf(b)
        );
    }
    return false;
}

function equalSets(a: Set<unknown>, b: Set<unknown>): boolean {
    return a.size === b.size && [...a.values()].every((v) => b.has(v));
}

function isObject(x: unknown): x is Record<string, unknown> {
    return !!x && typeof x === "object";
}
