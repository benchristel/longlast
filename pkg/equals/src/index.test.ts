import {test, expect, is} from "@benchristel/taste";

import {equals} from "./index.ts";

test("equals", {
    "equates identical objects"() {
        const object = {};
        expect(equals(object, object), is, true);
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
        const result = equals([1, 2, NaN], [1, 2, NaN]);
        expect(result, is, true);
    },

    "equates arrays with equal complex elements"() {
        const result = equals([[1], {a: 2}], [[1], {a: 2}]);
        expect(result, is, true);
    },

    "distinguishes arrays with unequal complex elements"() {
        const result = equals([[1], {a: 2}], [[1], {a: 999}]);
        expect(result, is, false);
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
        expect(equals({a: 1}, {b: 1}), is, false);
    },

    "distinguishes objects with the same keys but different values"() {
        expect(equals({a: 1}, {a: 2}), is, false);
    },

    "equates objects with equal primitive properties"() {
        const result = equals({ a: 1, bb: 22 }, { a: 1, bb: 22 });
        expect(result, is, true);
    },

    "ignores object key order"() {
        const result = equals({ a: 1, bb: 22 }, { bb: 22, a: 1 });
        expect(result, is, true);
    },

    "equates objects with equal complex properties"() {
        expect(equals({a: {b: 1}}, {a: {b: 1}}), is, true);
    },

    "distinguishes objects with different complex properties"() {
        expect(equals({a: {b: 1}}, {a: {b: 999}}), is, false);
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
        expect(equals(new ClassOne(1), new ClassOne(1)), is, true);
    },

    "distinguishes instances of the same class with different properties"() {
        class ClassOne {
            public a: number;
            constructor(a: number) {
                this.a = a;
            }
        }
        expect(equals(new ClassOne(1), new ClassOne(2)), is, false);
    },

    "distinguishes a subclass instance from a superclass instance"() {
        class Superclass {}
        class Subclass extends Superclass {}
        expect(equals(new Subclass(), new Superclass()), is, false);
        expect(equals(new Superclass(), new Subclass()), is, false);
    },

    "distinguishes different functions"() {
        expect(
            equals(
                () => {},
                () => {},
            ),
            is,
            false,
        );
    },

    "equates a function with itself"() {
        expect(equals(equals, equals), is, true);
    },

    "distinguishes different dates"() {
        expect(
            equals(new Date("1999-12-21"), new Date("2001-12-22")),
            is,
            false,
        );
    },

    "equates equal dates"() {
        expect(
            equals(new Date("1999-12-21"), new Date("1999-12-21")),
            is,
            true,
        );
    },

    "equates objects with no prototypes"() {
        expect(equals(Object.create(null), Object.create(null)), is, true);
    },

    "distinguishes sets with different sizes"() {
        expect(equals(new Set([1]), new Set([])), is, false);
        expect(equals(new Set([]), new Set([1])), is, false);
    },

    "distinguishes sets with different members"() {
        expect(equals(new Set([1]), new Set([2])), is, false);
    },

    "equates sets with identical members"() {
        expect(equals(new Set([1, 2]), new Set([1, 2])), is, true);
    },

    "distinguishes sets with equal but not identical members"() {
        expect(equals(new Set([{}]), new Set([{}])), is, false);
    },

    "equates Errors with equal messages"() {
        expect(equals(new Error("a"), new Error("a")), is, true);
    },

    "distinguishes Errors with different messages"() {
        expect(equals(new Error("a"), new Error("b")), is, false);
    },

    "distinguishes Errors with different classes"() {
        class TestError extends Error {}
        expect(equals(new TestError("a"), new Error("a")), is, false);
        expect(equals(new Error("a"), new TestError("a")), is, false);
    },

    "equates instances of the same Error subclass"() {
        class TestError extends Error {}
        expect(equals(new TestError("a"), new TestError("a")), is, true);
    },

    "handles an object with a reference cycle"() {
        const obj: {a: unknown} = {a: null};
        obj.a = obj;
        expect(equals(obj, obj), is, true);
    },

    "throws given two objects with different reference cycles"() {
        const obj1: {a: unknown} = {a: null};
        const obj2: {a: unknown} = {a: null};
        obj1.a = obj1;
        obj2.a = obj2;
        expect(
            throws(() => equals(obj1, obj2)),
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
