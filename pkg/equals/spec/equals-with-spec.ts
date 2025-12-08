import {expect, is} from "@benchristel/taste";
import {curry} from "@longlast/curry";

interface EqualsWithOptions {
    override?: undefined | ((a: unknown, b: unknown) => undefined | boolean);
}
type EqualsWithFn = (
    opts: EqualsWithOptions,
) => (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function equalsWithSpec(_equalsWith: EqualsWithFn): Spec {
    function override(a: unknown, b: unknown) {
        if (a === 0 && b === 0) {
            return true;
        }
        return;
    }

    const mathEquals = _equalsWith({override});

    return {
        "behaves as equals if no override function is given"() {
            const equals = _equalsWith({});
            expect(equals([0, NaN], [0, NaN]), is, true);
        },

        "can create a mathematical deep-equality function"() {
            expect(mathEquals(0, -0), is, true);
        },

        "applies the override when recursing into arrays"() {
            expect(mathEquals([0], [-0]), is, true);
        },

        "applies the override when recursing into objects"() {
            expect(mathEquals({x: 0}, {x: -0}), is, true);
        },

        "applies the override when recursing into maps"() {
            const a = new Map();
            const b = new Map();
            a.set("x", 0);
            b.set("x", -0);
            expect(mathEquals(a, b), is, true);
        },

        "applies the override when recursing into function arguments"() {
            const f = curry((_x: unknown, _y: unknown) => {});
            expect(mathEquals(f(0), f(-0)), is, true);
        },
    };
}
