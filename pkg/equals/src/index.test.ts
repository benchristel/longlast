import {test, expect, is} from "@benchristel/taste";
import {equals} from "./index.ts";
import {behavesLikeEquals} from "../api/spec.ts";

behavesLikeEquals(equals, "equals");

test("equals", {
    "equates empty arrays"() {
        expect(equals([], []), is, true);
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

    "ignores object key order"() {
        const a = {x: 1, y: 2};
        const b = {y: 2, x: 1};
        expect(equals(a, b), is, true);
    },

    "distinguishes a missing property from undefined"() {
        const a = {x: undefined};
        const b = {y: undefined};
        expect(equals(a, b), is, false);
    },

    "ignores non-enumerable properties"() {
        const a = {x: 1};
        const b = {y: 2};
        Object.defineProperty(a, "y", {value: 2, enumerable: false});
        Object.defineProperty(b, "x", {value: 1, enumerable: false});
        expect(equals(a, b), is, false);
        expect(equals(b, a), is, false);
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

    "equates objects with no prototypes"() {
        const a = Object.create(null);
        const b = Object.create(null);
        expect(equals(a, b), is, true);
    },

    "handles an object with a reference cycle"() {
        const obj: {x: unknown} = {x: null};
        obj.x = obj;
        expect(equals(obj, obj), is, true);
    },

    "equates invalid Dates"() {
        const a = new Date("asdf");
        const b = new Date("jkl;");
        expect(equals(a, b), is, true);
    },

    "distinguishes a valid Date from an invalid one"() {
        const a = new Date("1999-12-21");
        const b = new Date("asdf");
        expect(equals(a, b), is, false);
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
