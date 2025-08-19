import {test, expect, is} from "@benchristel/taste";
import {equals} from "../index.ts";

test("equals", {
    /*
     * Object identity
     */

    "equates identical objects"() {
        const a = {};
        expect(equals(a, a), is, true);
    },

    /*
     * Null and undefined
     */

    "equates nulls"() {
        expect(equals(null, null), is, true);
    },

    "equates undefineds"() {
        expect(equals(undefined, undefined), is, true);
    },

    "distinguishes null from undefined"() {
        expect(equals(null, undefined), is, false);
    },

    /*
     * Booleans
     */

    "equates identical booleans"() {
        expect(equals(false, false), is, true);
    },

    "distinguishes different booleans"() {
        expect(equals(false, true), is, false);
    },

    /*
     * Numbers
     */

    "equates identical numbers"() {
        expect(equals(1, 1), is, true);
    },

    "distinguishes different numbers"() {
        expect(equals(1, 2), is, false);
    },

    "equates NaNs"() {
        expect(equals(NaN, NaN), is, true);
    },

    "distinguishes -0 from 0"() {
        expect(equals(-0, 0), is, false);
    },

    /*
     * Strings
     */

    "equates identical strings"() {
        expect(equals("x", "x"), is, true);
    },

    "distinguishes different strings"() {
        const a = "x";
        const b = "xx";
        expect(equals(a, b), is, false);
    },

    "distinguishes strings from numbers"() {
        const a = 1;
        const b = "1";
        expect(equals(a, b), is, false);
    },

    /*
     * BigInts
     */

    "equates identical bigints"() {
        expect(equals(10n, 10n), is, true);
    },

    "distinguishes different bigints"() {
        expect(equals(1n, 99n), is, false);
    },

    "distinguishes bigints from numbers"() {
        expect(equals(10n, 10), is, false);
    },

    /*
     * Dates
     */

    "equates equal dates"() {
        const a = new Date("1999-12-21");
        const b = new Date("1999-12-21");
        expect(equals(a, b), is, true);
    },

    "distinguishes different dates"() {
        const a = new Date("1999-12-21");
        const b = new Date("2001-01-18");
        expect(equals(a, b), is, false);
    },

    /*
     * Arrays
     */

    "distinguishes arrays of different lengths"() {
        expect(equals([], [undefined]), is, false);
    },

    "distinguishes arrays with different elements"() {
        const a = [1];
        const b = [2];
        expect(equals(a, b), is, false);
    },

    "equates arrays with equal elements"() {
        const a = [1, 2, NaN, {x: 1}];
        const b = [1, 2, NaN, {x: 1}];
        expect(equals(a, b), is, true);
    },

    /*
     * Objects
     */

    "distinguishes objects from arrays"() {
        expect(equals([], {}), is, false);
    },

    "distinguishes objects with different numbers of keys"() {
        expect(equals({a: 1}, {}), is, false);
    },

    "distinguishes objects with different keys"() {
        const a = {x: 1};
        const b = {y: 1};
        expect(equals(a, b), is, false);
    },

    "equates objects with equal properties"() {
        const a = {x: {y: 1}};
        const b = {x: {y: 1}};
        expect(equals(a, b), is, true);
    },

    /*
     * Sets
     */

    "distinguishes sets with different sizes"() {
        const a = new Set([1]);
        const b = new Set([]);
        expect(equals(a, b), is, false);
    },

    "distinguishes sets with different members"() {
        const a = new Set([1]);
        const b = new Set([2]);
        expect(equals(a, b), is, false);
    },

    "equates sets with identical members"() {
        const a = new Set([1, 2]);
        const b = new Set([1, 2]);
        expect(equals(a, b), is, true);
    },

    "distinguishes sets with equal but not identical members"() {
        const a = new Set([{}]);
        const b = new Set([{}]);
        expect(equals(a, b), is, false);
    },
});
