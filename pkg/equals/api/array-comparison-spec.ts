import {expect, is} from "@benchristel/taste";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function arrayComparisonSpec(_equals: EqualsFn): Spec {
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
