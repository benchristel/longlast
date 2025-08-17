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
 *   - Dates are equal iff they serialize to the same ISO string.
 *   - Sets are equal iff they contain the same elements. Note that set
 *     elements are _not_ deeply compared.
 *   - Errors are equal iff they have the same class and message.
 *   - Other objects are equal iff they have the same prototype (e.g. the same
 *     class) and the same set of enumerable string-keyed properties, and the
 *     values of their corresponding properties are equal (according to
 *     `equals`).
 *   - Primitives `a` and `b` are equal iff `a === b`.
 *
 * `equals()` can throw a RangeError if one of its arguments contains a
 * reference cycle. Avoid passing mutable objects to `equals()` unless you know
 * that they do not contain cycles.
 */
export function equals(a: unknown, b: unknown): boolean {
    if (a === b) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((_, i) => equals(a[i], b[i]));
    }
    if (a instanceof Date && b instanceof Date) {
        return a.toISOString() === b.toISOString();
    }
    if (a instanceof Set && b instanceof Set) {
        return a.size === b.size && [...a.values()].every((v) => b.has(v));
    }
    if (a instanceof Error && b instanceof Error) {
        return (
            a.message === b.message &&
            Object.getPrototypeOf(a)?.constructor ===
                Object.getPrototypeOf(b)?.constructor
        );
    }
    if (isObject(a) && isObject(b)) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        return (
            aKeys.length === bKeys.length &&
            aKeys.every((k) => equals(a[k], b[k])) &&
            Object.getPrototypeOf(a)?.constructor ===
                Object.getPrototypeOf(b)?.constructor
        );
    }
    return a === b;
}

function isObject(x: unknown): x is Record<string, unknown> {
    return !!x && typeof x === "object";
}
