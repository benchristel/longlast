/**
 * @module equals
 */

import {curry, type Curried2} from "@longlast/curry";
import {
    $boundArguments,
    $equals,
    $getBoundArguments,
    $unapplied,
} from "@longlast/symbols";

// TODO: export an `Equatable` interface that classes with the [$equals] method
// can implement.

/**
 * @function
 * Deeply compares two values, returning true if they're equal and false
 * otherwise. The following criteria are used to determine equality:
 *
 *   - All values are equal to themselves.
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
 * You can customize how `equals()` compares values of a specific class by
 * using the {@link symbols.$equals $equals} symbol to define a method on that
 * class. For example:
 *
 * ```ts
 * import {$equals} from "@longlast/symbols"
 *
 * class HttpError extends Error {
 *     private statusCode: number;
 *     constructor(message: string, statusCode: number) {
 *         super(message);
 *         this.statusCode = statusCode;
 *     }
 *
 *     [$equals](other: unknown) {
 *         return other instanceof HttpError &&
 *             other.statusCode === this.statusCode &&
 *             other.message === this.message;
 *     }
 * }
 * ```
 *
 * Note that this makes the comparison asymmetrical: `a` is considered equal to
 * `b` iff `a[$equals](b)` returns truthy. The `$equals` method will always be
 * called on the *first* argument to `equals()`.
 *
 * `equals()` is curried. See {@link curry}.
 *
 * ## Limitations
 *
 * `equals()` can throw a `RangeError` if one of its arguments contains a
 * reference cycle. Avoid passing mutable objects to `equals()` unless you know
 * that they do not contain cycles.
 */

export const equals: Curried2<unknown, unknown, boolean> = curry(_equals);

function _equals(a: unknown, b: unknown): boolean {
    // This is an optimized implementation. There is a simpler, equivalent one
    // in pkg/equals/alt/reference.ts.

    if (a == null) {
        return a === b;
    }

    // TODO: (pre-1.0.0) decide if we should pass `equals` as the second
    // argument to [$equals]. This would open the "protocol" up a bit more,
    // since people could then define their own implementations of `equals`
    // that work consistently through custom equality comparisons.
    if (typeof (a as any)[$equals] === "function") {
        return Boolean((a as any)[$equals](b));
    }

    if (Object.is(a, b)) {
        return true;
    }

    if (typeof a === "function" && typeof b === "function") {
        const aUnapplied = (a as any)[$unapplied];
        const bUnapplied = (b as any)[$unapplied];
        return (
            aUnapplied != null &&
            aUnapplied === bUnapplied &&
            _equals(getBoundArguments(a), getBoundArguments(b))
        );
    }

    // If `a` is a primitive at this point, return false, since we already know
    // it is not identical to `b`.
    if (typeof a !== "object") {
        return false;
    }

    const aConstructorString = functionString(constructorOf(a));
    const bConstructorString = functionString(constructorOf(b));

    if (aConstructorString !== bConstructorString) {
        return false;
    }

    if (dateConstructorString === aConstructorString) {
        unsafeNarrow<Date>(a);
        unsafeNarrow<Date>(b);
        return Object.is(+a, +b);
    }

    if (regexConstructorString === aConstructorString) {
        return String(a) === String(b);
    }

    if (
        a instanceof Error ||
        nativeErrorConstructorStrings.includes(aConstructorString)
    ) {
        unsafeNarrow<Error>(a);
        unsafeNarrow<Error>(b);
        return a.message === b.message;
    }

    if (Array.isArray(a)) {
        unsafeNarrow<Array<unknown>>(b);
        return a.length === b.length && a.every((_, i) => _equals(a[i], b[i]));
    }

    if (setConstructorString === aConstructorString) {
        unsafeNarrow<Set<unknown>>(a);
        unsafeNarrow<Set<unknown>>(b);
        return a.size === b.size && [...a].every((v) => b.has(v));
    }

    // TODO: typed arrays
    // TODO: Map

    if (
        objectConstructorString === aConstructorString ||
        protoOf(a) === protoOf(b)
    ) {
        unsafeNarrow<AnyObject>(a);
        unsafeNarrow<AnyObject>(b);
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        const bKeySet = new Set(bKeys);
        for (const key of aKeys) {
            if (!bKeySet.has(key)) {
                return false;
            }
            if (!_equals(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function getBoundArguments(f: any): unknown[] | undefined {
    // TODO: (pre-1.0.0) remove `f[$boundArguments]` fallback.
    return f[$getBoundArguments]?.() ?? f[$boundArguments];
}

function functionString(f: any): string {
    if (typeof f !== "function") {
        return "";
    }
    return Function.prototype.toString.call(f);
}

function constructorOf(value: unknown) {
    if (value == null) {
        return null;
    }
    return Object.getPrototypeOf(value)?.constructor;
}

function unsafeNarrow<T>(value: unknown): asserts value is T {
    value;
}

const protoOf = Object.getPrototypeOf;

type AnyObject = Record<keyof any, unknown>;

const objectConstructorString = functionString(Object);
const dateConstructorString = functionString(Date);
const regexConstructorString = functionString(RegExp);
const setConstructorString = functionString(Set);
const nativeErrorConstructorStrings = [
    functionString(Error),
    // TODO: add DOMException? Be sure to check the `name` property.
    functionString(EvalError),
    functionString(RangeError),
    functionString(ReferenceError),
    functionString(SyntaxError),
    functionString(TypeError),
    functionString(URIError),
];
