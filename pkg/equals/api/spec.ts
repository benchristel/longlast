import {expect, is} from "@benchristel/taste";
import {type equals} from "#@longlast/equals";
import {curry} from "@longlast/curry";
import {$equals} from "@longlast/symbols";
import {createContext, runInContext} from "node:vm";

type Spec = Record<string, () => void>;

export function dollarEqualsMethodSpec(_equals: typeof equals): Spec {
    return {
        "equates `a` and `b` if `a[$equals](b)` returns true"() {
            class CustomValue {
                property?: string;
                [$equals](_: unknown): boolean {
                    return true;
                }
            }

            const a = new CustomValue();
            a.property = "a";
            const b = new CustomValue();
            b.property = "b";

            expect(_equals(a, b), is, true);
        },

        "distinguishes `a` and `b` if `a[$equals](b)` doesn't return true"() {
            class CustomValue {
                [$equals](_: unknown) {}
            }

            const a = new CustomValue();
            const b = new CustomValue();

            expect(_equals(a, b), is, false);
        },

        "uses $equals in preference to the default Error comparison"() {
            class HttpError extends Error {
                private statusCode: number;
                constructor(message: string, statusCode: number) {
                    super(message);
                    this.statusCode = statusCode;
                }

                [$equals](other: unknown) {
                    return (
                        other instanceof HttpError &&
                        other.statusCode === this.statusCode &&
                        other.message === this.message
                    );
                }
            }

            const a = new HttpError("", 404);
            const b = new HttpError("", 500);
            expect(_equals(a, b), is, false);
        },

        "uses $equals in preference to Object.is() comparison"() {
            function aNumberGreaterThan(threshold: number): unknown {
                return {
                    [$equals](other: unknown) {
                        return typeof other === "number" && other > threshold;
                    },
                };
            }
            const aPositive = aNumberGreaterThan(0);
            expect(_equals(aPositive, 1), is, true);
            expect(_equals(aPositive, 0), is, false);
            expect(_equals(aPositive, aPositive), is, false);
        },
    };
}

export function primitiveComparisonSpec(_equals: typeof equals): Spec {
    return {
        /*
         * Null and undefined
         */

        "equates nulls"() {
            expect(_equals(null, null), is, true);
        },

        "equates undefineds"() {
            expect(_equals(undefined, undefined), is, true);
        },

        "distinguishes null from undefined"() {
            expect(_equals(null, undefined), is, false);
        },

        /*
         * Booleans
         */

        "equates identical booleans"() {
            expect(_equals(false, false), is, true);
        },

        "distinguishes different booleans"() {
            expect(_equals(false, true), is, false);
        },

        /*
         * Numbers
         */

        "equates identical numbers"() {
            expect(_equals(1, 1), is, true);
        },

        "distinguishes different numbers"() {
            expect(_equals(1, 2), is, false);
        },

        "equates NaNs"() {
            expect(_equals(NaN, NaN), is, true);
        },

        "distinguishes -0 from 0"() {
            expect(_equals(-0, 0), is, false);
        },

        /*
         * Strings
         */

        "equates identical strings"() {
            expect(_equals("x", "x"), is, true);
        },

        "distinguishes different strings"() {
            const a = "x";
            const b = "xx";
            expect(_equals(a, b), is, false);
        },

        "distinguishes strings from numbers"() {
            const a = 1;
            const b = "1";
            expect(_equals(a, b), is, false);
        },

        /*
         * BigInts
         */

        "equates identical bigints"() {
            expect(_equals(10n, 10n), is, true);
        },

        "distinguishes different bigints"() {
            expect(_equals(1n, 99n), is, false);
        },

        "distinguishes bigints from numbers"() {
            expect(_equals(10n, 10), is, false);
        },

        /*
         * Symbols
         */

        "equates identical symbols"() {
            const a = Symbol();
            expect(_equals(a, a), is, true);
        },

        "distinguishes different symbols"() {
            const a = Symbol();
            const b = Symbol();
            expect(_equals(a, b), is, false);
        },
    };
}

export function dateComparisonSpec(_equals: typeof equals): Spec {
    return {
        "equates equal dates"() {
            const a = new Date("1999-12-21");
            const b = new Date("1999-12-21");
            expect(_equals(a, b), is, true);
        },

        "distinguishes different dates"() {
            const a = new Date("1999-12-21 00:00:00.000Z");
            const b = new Date("1999-12-21 00:00:00.001Z");
            expect(_equals(a, b), is, false);
        },

        "equates invalid Dates"() {
            const a = new Date("asdf");
            const b = new Date("jkl;");
            expect(_equals(a, b), is, true);
        },

        "distinguishes a valid Date from an invalid one"() {
            const a = new Date("1999-12-21");
            const b = new Date("asdf");
            expect(_equals(a, b), is, false);
        },
    };
}

export function regexpComparisonSpec(_equals: typeof equals): Spec {
    return {
        "equates equal RegExp objects"() {
            const a = /x/;
            const b = /x/;
            expect(_equals(a, b), is, true);
        },

        "distinguishes different RegExp objects"() {
            const a = /x/;
            const b = /y/;
            expect(_equals(a, b), is, false);
        },

        "distinguishes RegExp objects that differ only by flags"() {
            const a = /x/;
            const b = /x/i;
            expect(_equals(a, b), is, false);
        },

        "ignores RegExp flag order"() {
            const a = /x/gi;
            const b = /x/gi;
            expect(_equals(a, b), is, true);
        },
    };
}

export function arrayComparisonSpec(_equals: typeof equals): Spec {
    return {
        "equates empty arrays"() {
            expect(_equals([], []), is, true);
        },

        "distinguishes arrays of different lengths"() {
            expect(_equals([], [undefined]), is, false);
        },

        "distinguishes arrays with different elements"() {
            const a = [1];
            const b = [2];
            expect(_equals(a, b), is, false);
        },

        "equates arrays with equal elements"() {
            const a = [1, 2, NaN, {x: 1}];
            const b = [1, 2, NaN, {x: 1}];
            expect(_equals(a, b), is, true);
        },

        "distinguishes arrays with unequal complex elements"() {
            const a = [[1], {a: 2}];
            const b = [[1], {a: 999}];
            expect(_equals(a, b), is, false);
        },

        "distinguishes an array from a non-array"() {
            expect(_equals([], null), is, false);
            expect(_equals(null, []), is, false);
        },

        "distinguishes arrays and objects"() {
            expect(_equals([], {}), is, false);
            expect(_equals({}, []), is, false);
        },
    };
}

export function setComparisonSpec(_equals: typeof equals): Spec {
    return {
        "distinguishes sets with different sizes"() {
            const a = new Set([1]);
            const b = new Set([]);
            expect(_equals(a, b), is, false);
        },

        "distinguishes sets with different members"() {
            const a = new Set([1]);
            const b = new Set([2]);
            expect(_equals(a, b), is, false);
        },

        "equates sets with identical members"() {
            const a = new Set([1, 2]);
            const b = new Set([1, 2]);
            expect(_equals(a, b), is, true);
        },

        "distinguishes sets with equal but not identical members"() {
            const a = new Set([{}]);
            const b = new Set([{}]);
            expect(_equals(a, b), is, false);
        },

        "equates sets whose members are identical but not ==="() {
            const a = new Set([NaN]);
            const b = new Set([NaN]);
            expect(_equals(a, b), is, true);
        },

        "distinguishes sets whose members are === but not identical"() {
            const a = new Set([0]);
            const b = new Set([-0]);
            expect(_equals(a, b), is, true);
        },
    };
}

export function mapComparisonSpec(_equals: typeof equals): Spec {
    return {
        "equates empty maps"() {
            const a = new Map();
            const b = new Map();
            expect(_equals(a, b), is, true);
        },

        "distinguishes maps with different sizes"() {
            const a = new Map();
            const b = new Map();
            a.set("key", "value");
            expect(_equals(a, b), is, false);
        },

        "distinguishes maps with different keys"() {
            const a = new Map();
            const b = new Map();
            a.set("key1", "value");
            b.set("key2", "value");
            expect(_equals(a, b), is, false);
        },

        "distinguishes maps with different values"() {
            const a = new Map();
            const b = new Map();
            a.set("key", "value1");
            b.set("key", "value2");
            expect(_equals(a, b), is, false);
        },

        "distinguishes a missing map key from undefined"() {
            const a = new Map();
            const b = new Map();
            a.set("key1", undefined);
            b.set("key2", undefined);
            expect(_equals(a, b), is, false);
        },

        "deeply compares map values"() {
            const a = new Map();
            const b = new Map();
            a.set("key1", {foo: 1});
            b.set("key1", {foo: 1});
            expect(_equals(a, b), is, true);
        },

        "respects asymmetric comparisons between map values"() {
            const a = new Map();
            const b = new Map();
            const equalToAnything = {[$equals]: () => true};
            a.set("key1", equalToAnything);
            b.set("key1", {foo: 1});
            expect(_equals(a, b), is, true);
        },

        "ignores the order of map keys"() {
            // Per MDN, "The Map object ... remembers the original insertion
            // order of the keys."
            const a = new Map();
            a.set("1", "1");
            a.set("2", "2");

            const b = new Map();
            b.set("2", "2");
            b.set("1", "1");

            expect(_equals(a, b), is, true);
        },
    };
}

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
