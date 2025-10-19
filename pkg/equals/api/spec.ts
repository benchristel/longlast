import {test, expect, is} from "@benchristel/taste";
import {type equals} from "#@longlast/equals";
import {curry} from "@longlast/curry";
import {$equals} from "@longlast/symbols";

export function behavesLikeEquals(
    _equals: typeof equals,
    subjectName: string,
): void {
    test(subjectName, {
        /*
         * Object identity
         */

        "equates identical objects"() {
            const a = {};
            expect(_equals(a, a), is, true);
        },

        /*
         * Custom equality operator ($equals)
         */

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

        /*
         * Dates
         */

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

        /*
         * RegExps
         */

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

        /*
         * Arrays
         */

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

        /*
         * Objects
         */

        "distinguishes objects from arrays"() {
            expect(_equals([], {}), is, false);
        },

        "distinguishes objects with different numbers of keys"() {
            expect(_equals({a: 1}, {}), is, false);
            expect(_equals({}, {a: 1}), is, false);
        },

        "distinguishes objects with different keys"() {
            const a = {x: 1};
            const b = {y: 1};
            expect(_equals(a, b), is, false);
        },

        "distinguishes objects with different property values"() {
            const a = {x: 1};
            const b = {x: 2};
            expect(_equals(a, b), is, false);
        },

        "equates objects with equal properties"() {
            const a = {x: {y: 1}};
            const b = {x: {y: 1}};
            expect(_equals(a, b), is, true);
        },

        /*
         * Sets
         */

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

        /*
         * Errors
         */

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

        /*
         * Functions
         */

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

        /*
         * Currying
         */

        "is curried"() {
            expect(_equals(42)(42), is, true);
        },

        "ignores extra arguments"() {
            // `map()` passes the index and array to each invocation of
            // `_equals(1)`.
            expect([0, 1, 2].map(_equals(1)).join(","), is, "false,true,false");
        },
    });
}
