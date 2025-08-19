import {test, expect, is} from "@benchristel/taste";

import {equals} from "./index.ts";

test("equals", {
    "equates identical objects"() {
        const a = {};
        expect(equals(a, a), is, true);
    },

    "equates identical numbers"() {
        expect(equals(1, 1), is, true);
    },

    "distinguishes different numbers"() {
        expect(equals(1, 2), is, false);
    },

    "distinguishes primitive values of different types"() {
        expect(equals(1, "1"), is, false);
    },

    "equates nulls"() {
        expect(equals(null, null), is, true);
    },

    "equates undefineds"() {
        expect(equals(undefined, undefined), is, true);
    },

    "distinguishes null from undefined"() {
        expect(equals(null, undefined), is, false);
    },

    "equates identical bigints"() {
        expect(equals(10n, 10n), is, true);
    },

    "distinguishes different bigints"() {
        expect(equals(1n, 99n), is, false);
    },

    "distinguishes bigints from numbers"() {
        expect(equals(10n, 10), is, false);
    },

    "equates NaNs"() {
        expect(equals(NaN, NaN), is, true);
    },

    "distinguishes -0 from 0"() {
        expect(equals(-0, 0), is, false);
    },

    "equates empty arrays"() {
        expect(equals([], []), is, true);
    },

    "distinguishes arrays of different lengths"() {
        expect(equals([], [undefined]), is, false);
        expect(equals([undefined], []), is, false);
    },

    "distinguishes arrays with different elements"() {
        expect(equals([1], [2]), is, false);
    },

    "equates arrays with equal primitive elements"() {
        const a = [1, 2, NaN];
        const b = [1, 2, NaN];
        expect(equals(a, b), is, true);
    },

    "equates arrays with equal complex elements"() {
        const a = [[1], {a: 2}];
        const b = [[1], {a: 2}];
        expect(equals(a, b), is, true);
    },

    "distinguishes arrays with unequal complex elements"() {
        const a = [[1], {a: 2}];
        const b = [[1], {a: 999}];
        expect(equals(a, b), is, false);
    },

    "distinguishes an array from a non-array"() {
        expect(equals([], null), is, false);
        expect(equals(null, []), is, false);
    },

    "equates empty objects"() {
        expect(equals({}, {}), is, true);
    },

    "distinguishes arrays and objects"() {
        expect(equals([], {}), is, false);
        expect(equals({}, []), is, false);
    },

    "distinguishes objects with different numbers of keys"() {
        expect(equals({a: 1}, {}), is, false);
        expect(equals({}, {a: 1}), is, false);
    },

    "distinguishes objects with different keys"() {
        const a = {x: 1};
        const b = {y: 1};
        expect(equals(a, b), is, false);
    },

    "distinguishes objects with the same keys but different values"() {
        const a = {x: 1};
        const b = {x: 2};
        expect(equals(a, b), is, false);
    },

    "equates objects with equal primitive properties"() {
        const a = {x: 1, y: 22};
        const b = {x: 1, y: 22};
        expect(equals(a, b), is, true);
    },

    "ignores object key order"() {
        const a = {x: 1, y: 2};
        const b = {y: 2, x: 1};
        expect(equals(a, b), is, true);
    },

    "equates objects with equal complex properties"() {
        const a = {x: {y: 1}};
        const b = {x: {y: 1}};
        expect(equals(a, b), is, true);
    },

    "distinguishes objects with different complex properties"() {
        const a = {x: {y: 1}};
        const b = {x: {y: 999}};
        expect(equals(a, b), is, false);
    },

    "distinguishes different classes"() {
        class ClassOne {}
        class ClassTwo {}
        expect(equals(ClassOne, ClassTwo), is, false);
    },

    "distinguishes instances of different classes"() {
        class ClassOne {}
        class ClassTwo {}
        expect(equals(new ClassOne(), new ClassTwo()), is, false);
    },

    "equates instances of the same class with the same properties"() {
        class ClassOne {
            public a: number;
            constructor(a: number) {
                this.a = a;
            }
        }
        const a = new ClassOne(1);
        const b = new ClassOne(1);
        expect(equals(a, b), is, true);
    },

    "distinguishes instances of the same class with different properties"() {
        class ClassOne {
            public a: number;
            constructor(a: number) {
                this.a = a;
            }
        }
        const a = new ClassOne(1);
        const b = new ClassOne(22);
        expect(equals(a, b), is, false);
    },

    "distinguishes a subclass instance from a superclass instance"() {
        class Superclass {}
        class Subclass extends Superclass {}
        expect(equals(new Subclass(), new Superclass()), is, false);
        expect(equals(new Superclass(), new Subclass()), is, false);
    },

    "distinguishes different functions"() {
        const a = () => {};
        const b = () => {};
        expect(equals(a, b), is, false);
    },

    "equates a function with itself"() {
        expect(equals(equals, equals), is, true);
    },

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

    "equates objects with no prototypes"() {
        const a = Object.create(null);
        const b = Object.create(null);
        expect(equals(a, b), is, true);
    },

    "distinguishes sets with different sizes"() {
        expect(equals(new Set([1]), new Set([])), is, false);
        expect(equals(new Set([]), new Set([1])), is, false);
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

    "equates Errors with equal messages"() {
        const a = new Error("a");
        const b = new Error("a");
        expect(equals(a, b), is, true);
    },

    "distinguishes Errors with different messages"() {
        const a = new Error("a");
        const b = new Error("b");
        expect(equals(a, b), is, false);
    },

    "distinguishes Errors with different classes"() {
        class TestError extends Error {}
        expect(equals(new TestError("a"), new Error("a")), is, false);
        expect(equals(new Error("a"), new TestError("a")), is, false);
    },

    "equates instances of the same Error subclass"() {
        class TestError extends Error {}
        const a = new TestError("x");
        const b = new TestError("x");
        expect(equals(a, b), is, true);
    },

    "handles an object with a reference cycle"() {
        const obj: {x: unknown} = {x: null};
        obj.x = obj;
        expect(equals(obj, obj), is, true);
    },

    "throws given two objects with different reference cycles"() {
        const a: {x: unknown} = {x: null};
        const b: {x: unknown} = {x: null};
        a.x = a;
        b.x = b;
        expect(
            throws(() => equals(a, b)),
            is,
            true,
        );
    },
});

function throws(f: () => unknown) {
    try {
        f();
        return false;
    } catch {
        return true;
    }
}
