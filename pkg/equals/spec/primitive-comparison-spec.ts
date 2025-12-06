import {expect, is} from "@benchristel/taste";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function primitiveComparisonSpec(_equals: EqualsFn): Spec {
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
