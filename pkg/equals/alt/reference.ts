import {curry, type Curried2} from "@longlast/curry";
import {$equals, $getBoundArguments, $unapplied} from "@longlast/symbols";

export const equals: Curried2<unknown, unknown, boolean> = curry(_equals);

function _equals(a: unknown, b: unknown): boolean {
    if (a != null && typeof (a as any)[$equals] === "function") {
        return Boolean((a as any)[$equals](b));
    }
    if (Object.is(a, b)) {
        return true;
    }
    if (isA(Date, a) && isA(Date, b)) {
        return Object.is(+a, +b);
    }
    if (isA(RegExp, a) && isA(RegExp, b)) {
        return String(a) === String(b);
    }
    if (a instanceof Error && b instanceof Error) {
        return (
            a.message === b.message &&
            Object.getPrototypeOf(a) === Object.getPrototypeOf(b)
        );
    }
    if (a instanceof Set && b instanceof Set) {
        return equalSets(a, b);
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((_, i) => equals(a[i], b[i]));
    }
    if (isObject(a) && isObject(b)) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        return (
            equalSets(new Set(aKeys), new Set(bKeys)) &&
            aKeys.every((k) => equals(a[k], b[k])) &&
            // TODO: don't equate objects from two different user-created
            // classes with the same constructor string.
            isA(constructorOf(a), b)
        );
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
    return false;
}

function getBoundArguments(f: any): unknown[] | undefined {
    return f[$getBoundArguments]?.();
}

function equalSets(a: Set<unknown>, b: Set<unknown>): boolean {
    return a.size === b.size && [...a].every((v) => b.has(v));
}

function isObject(x: unknown): x is Record<string, unknown> {
    return !!x && typeof x === "object";
}

function isA<T>(constructor: new (...args: any) => T, a: unknown): a is T {
    return functionString(constructorOf(a)) === functionString(constructor);
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
