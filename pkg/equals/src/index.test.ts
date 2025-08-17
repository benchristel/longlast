import {test, expect, is} from "@benchristel/taste";

import {equals} from "./index.ts";

test("equals", {
    "compares primitives"() {
        expect(equals(1, 1), is, true);
        expect(equals(1, 2), is, false);
    },

    "compares nulls"() {
        expect(equals(null, null), is, true);
    },

    "compares undefineds"() {
        expect(equals(undefined, undefined), is, true);
    },

    "treats null and undefined as different"() {
        expect(equals(null, undefined), is, false);
    },

    "compares bigints"() {
        expect(equals(BigInt("10"), BigInt("99")), is, false);
        expect(equals(BigInt("10"), BigInt("10")), is, true);
    },

    "compares bigints to numbers"() {
        expect(equals(BigInt("10"), 10), is, false);
    },

    "given empty arrays"() {
        expect(equals([], []), is, true);
    },

    "given arrays of different lengths"() {
        expect(equals([], [undefined]), is, false);
        expect(equals([undefined], []), is, false);
    },

    "given arrays with different elements"() {
        expect(equals([1], [2]), is, false);
    },

    "given equal arrays"() {
        expect(equals([1, 2, 3], [1, 2, 3]), is, true);
    },

    "given equal nested arrays"() {
        expect(equals([1, [2, 3], 4], [1, [2, 3], 4]), is, true);
    },

    "given unequal nested arrays"() {
        expect(equals([1, [2, 5], 4], [1, [2, 3], 4]), is, false);
    },

    "given an array and a non-array"() {
        expect(equals([], null), is, false);
        expect(equals(null, []), is, false);
    },

    "given empty objects"() {
        expect(equals({}, {}), is, true);
    },

    "given an array and an object"() {
        expect(equals([], {}), is, false);
        expect(equals({}, []), is, false);
    },

    "given objects with different numbers of keys"() {
        expect(equals({a: 1}, {}), is, false);
        expect(equals({}, {a: 1}), is, false);
    },

    "given objects with different keys"() {
        expect(equals({a: 1}, {b: 1}), is, false);
    },

    "given objects with the same keys but different values"() {
        expect(equals({a: 1}, {a: 2}), is, false);
    },

    "given equal objects"() {
        expect(equals({a: 1, b: 2}, {a: 1, b: 2}), is, true);
    },

    "doesn't care about key order"() {
        expect(equals({a: 1, b: 2}, {b: 2, a: 1}), is, true);
    },

    "deep-compares objects"() {
        expect(equals({a: {b: 1}}, {a: {b: 1}}), is, true);
    },

    "given classes"() {
        class ClassOne {}
        class ClassTwo {}
        expect(equals(ClassOne, ClassTwo), is, false);
    },

    "given instances of different classes"() {
        class ClassOne {}
        class ClassTwo {}
        expect(equals(new ClassOne(), new ClassTwo()), is, false);
    },

    "given instances of the same class with the same properties"() {
        class ClassOne {
            public a: number;
            constructor(a: number) {
                this.a = a;
            }
        }
        expect(equals(new ClassOne(1), new ClassOne(1)), is, true);
    },

    "given instances of the same class with different properties"() {
        class ClassOne {
            public a: number;
            constructor(a: number) {
                this.a = a;
            }
        }
        expect(equals(new ClassOne(1), new ClassOne(2)), is, false);
    },

    "given a subclass instance and a superclass instance"() {
        class Superclass {}
        class Subclass extends Superclass {}
        expect(equals(new Subclass(), new Superclass()), is, false);
        expect(equals(new Superclass(), new Subclass()), is, false);
    },

    "given different functions"() {
        expect(
            equals(
                () => {},
                () => {},
            ),
            is,
            false,
        );
    },

    "given the same function"() {
        expect(equals(equals, equals), is, true);
    },

    "given different dates"() {
        expect(
            equals(new Date("1999-12-21"), new Date("2001-12-22")),
            is,
            false,
        );
    },

    "given equal dates"() {
        expect(
            equals(new Date("1999-12-21"), new Date("1999-12-21")),
            is,
            true,
        );
    },

    "given objects with no prototypes"() {
        expect(equals(Object.create(null), Object.create(null)), is, true);
    },

    "given different sets with different sizes"() {
        expect(equals(new Set([1]), new Set([])), is, false);
        expect(equals(new Set([]), new Set([1])), is, false);
    },

    "given different sets with different members"() {
        expect(equals(new Set([1]), new Set([2])), is, false);
    },

    "given equal sets"() {
        expect(equals(new Set([1, 2]), new Set([1, 2])), is, true);
    },

    "given sets with equal but not identical elements"() {
        expect(equals(new Set([{}]), new Set([{}])), is, false);
    },

    "given Errors with equal messages"() {
        expect(equals(new Error("a"), new Error("a")), is, true);
    },

    "given Errors with different messages"() {
        expect(equals(new Error("a"), new Error("b")), is, false);
    },

    "given Errors with different classes"() {
        class TestError extends Error {}
        expect(equals(new TestError("a"), new Error("a")), is, false);
        expect(equals(new Error("a"), new TestError("a")), is, false);
    },

    "given instances of the same Error subclass"() {
        class TestError extends Error {}
        expect(equals(new TestError("a"), new TestError("a")), is, true);
    },

    "given an object with a reference cycle"() {
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
