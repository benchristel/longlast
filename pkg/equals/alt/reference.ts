import {curry, type Curried2} from "@longlast/curry";
import {$boundArguments, $equals, $unapplied} from "@longlast/symbols";

export const equals: Curried2<unknown, unknown, boolean> = curry(_equals);

function _equals(a: unknown, b: unknown): boolean {
    if (a != null && typeof (a as any)[$equals] === "function") {
        return Boolean((a as any)[$equals](b));
    }
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
            Object.getPrototypeOf(a) === Object.getPrototypeOf(b)
        );
    }
    if (typeof a === "function" && typeof b === "function") {
        const aArgs = (a as any)[$boundArguments];
        const bArgs = (b as any)[$boundArguments];
        const aUnapplied = (a as any)[$unapplied];
        const bUnapplied = (b as any)[$unapplied];
        return (
            aArgs != null &&
            aUnapplied != null &&
            _equals(aArgs, bArgs) &&
            aUnapplied === bUnapplied
        );
    }
    return false;
}

function equalSets(a: Set<unknown>, b: Set<unknown>): boolean {
    return a.size === b.size && [...a].every((v) => b.has(v));
}

function isObject(x: unknown): x is Record<string, unknown> {
    return !!x && typeof x === "object";
}
