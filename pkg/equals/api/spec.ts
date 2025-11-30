import {expect, is} from "@benchristel/taste";
import {type equals} from "#@longlast/equals";
import {curry} from "@longlast/curry";
import {createContext, runInContext} from "node:vm";

type Spec = Record<string, () => void>;

export function errorComparisonSpec(_equals: typeof equals): Spec {
    return {
        "equates Errors with equal messages"() {
            const a = new Error("a");
            const b = new Error("a");
            expect(_equals(a, b), is, true);
        },

        "distinguishes Errors with different messages"() {
            const a = new Error("a");
            const b = new Error("b");
            expect(_equals(a, b), is, false);
        },

        "distinguishes Errors with different classes"() {
            class TestError extends Error {}
            expect(_equals(new TestError("a"), new Error("a")), is, false);
            expect(_equals(new Error("a"), new TestError("a")), is, false);
        },

        "equates instances of the same Error subclass"() {
            class TestError extends Error {}
            const a = new TestError("x");
            const b = new TestError("x");
            expect(_equals(a, b), is, true);
        },

        "ignores nonstandard properties of Error subclasses"() {
            class TestError extends Error {}
            const a = new TestError("x");
            const b = new TestError("x");
            (a as any).nonstandard = 1;
            expect(_equals(a, b), is, true);
        },
    };
}

export function functionComparisonSpec(_equals: typeof equals): Spec {
    return {
        "distinguishes different functions"() {
            const a = () => {};
            const b = () => {};
            expect(_equals(a, b), is, false);
        },

        "equates a function with itself"() {
            const f = () => {};
            expect(_equals(f, f), is, true);
        },

        "equates a curried function with itself"() {
            const add = curry((a: number, b: number) => a + b);
            expect(_equals(add, add), is, true);
        },

        "equates partial applications with equal arguments"() {
            const concat = curry((a: unknown[], b: unknown[]) => a.concat(b));
            expect(_equals(concat([1]), concat([1])), is, true);
        },

        "distinguishes partial applications of different functions"() {
            const concat1 = curry((a: unknown[], b: unknown[]) => a.concat(b));
            const concat2 = curry((a: unknown[], b: unknown[]) => a.concat(b));
            expect(_equals(concat1([1]), concat2([1])), is, false);
        },

        "distinguishes partial applications with different arguments"() {
            const concat = curry((a: unknown[], b: unknown[]) => a.concat(b));
            expect(_equals(concat([1]), concat([99])), is, false);
        },
    };
}

export function crossRealmObjectComparisonSpec(_equals: typeof equals): Spec {
    return {
        "equates objects from different realms"() {
            const a = createCrossRealmObject("{x: 1}");
            const b = createCrossRealmObject("{x: 1}");

            expect(_equals(a, b), is, true);
            expect(_equals(a, {x: 1}), is, true);
        },

        "equates Arrays from different realms"() {
            const a = createCrossRealmObject("[1]");
            const b = createCrossRealmObject("[1]");

            expect(_equals(a, b), is, true);
            expect(_equals(a, [1]), is, true);
        },

        "equates Dates from different realms"() {
            const a = createCrossRealmObject("new Date(42)");
            const b = createCrossRealmObject("new Date(42)");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new Date(42)), is, true);
        },

        "equates RegExps from different realms"() {
            const a = createCrossRealmObject("/a/i");
            const b = createCrossRealmObject("/a/i");

            expect(_equals(a, b), is, true);
            expect(_equals(a, /a/i), is, true);
        },

        "equates Errors from different realms"() {
            const a = createCrossRealmObject("new Error('kablooie')");
            const b = createCrossRealmObject("new Error('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new Error("kablooie")), is, true);
        },

        "equates EvalErrors from different realms"() {
            const a = createCrossRealmObject("new EvalError('kablooie')");
            const b = createCrossRealmObject("new EvalError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new EvalError("kablooie")), is, true);
        },

        "equates RangeErrors from different realms"() {
            const a = createCrossRealmObject("new RangeError('kablooie')");
            const b = createCrossRealmObject("new RangeError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new RangeError("kablooie")), is, true);
        },

        "equates ReferenceErrors from different realms"() {
            const a = createCrossRealmObject("new ReferenceError('kablooie')");
            const b = createCrossRealmObject("new ReferenceError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new ReferenceError("kablooie")), is, true);
        },

        "equates SyntaxErrors from different realms"() {
            const a = createCrossRealmObject("new SyntaxError('kablooie')");
            const b = createCrossRealmObject("new SyntaxError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new SyntaxError("kablooie")), is, true);
        },

        "equates TypeErrors from different realms"() {
            const a = createCrossRealmObject("new TypeError('kablooie')");
            const b = createCrossRealmObject("new TypeError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new TypeError("kablooie")), is, true);
        },

        "equates URIErrors from different realms"() {
            const a = createCrossRealmObject("new URIError('kablooie')");
            const b = createCrossRealmObject("new URIError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new URIError("kablooie")), is, true);
        },

        "equates Sets from different realms"() {
            const a = createCrossRealmObject("new Set([1])");
            const b = createCrossRealmObject("new Set([1])");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new Set([1])), is, true);
        },
    };
}

export function curriedEqualsSpec(_equals: typeof equals): Spec {
    return {
        "is curried"() {
            expect(_equals(42)(42), is, true);
        },

        "ignores extra arguments"() {
            // `map()` passes the index and array to each invocation of
            // `_equals(1)`.
            expect([0, 1, 2].map(_equals(1)).join(","), is, "false,true,false");
        },
    };
}

function createCrossRealmObject(expression: string): unknown {
    const context = createContext({});
    return runInContext(`const value = (${expression}); value`, context);
}
