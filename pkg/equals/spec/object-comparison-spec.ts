import {expect, is} from "@benchristel/taste";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function objectComparisonSpec(_equals: EqualsFn): Spec {
    return {
        "equates identical objects"() {
            const a = {};
            expect(_equals(a, a), is, true);
        },

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

        "equates empty objects"() {
            expect(_equals({}, {}), is, true);
        },

        "ignores object key order"() {
            const a = {x: 1, y: 2};
            const b = {y: 2, x: 1};
            expect(_equals(a, b), is, true);
        },

        "distinguishes a missing property from undefined"() {
            const a = {x: undefined};
            const b = {y: undefined};
            expect(_equals(a, b), is, false);
        },

        "ignores non-enumerable properties"() {
            const a = {x: 1};
            const b = {y: 2};
            Object.defineProperty(a, "y", {value: 2, enumerable: false});
            Object.defineProperty(b, "x", {value: 1, enumerable: false});
            expect(_equals(a, b), is, false);
            expect(_equals(b, a), is, false);
        },

        "equates objects with no prototypes"() {
            const a = Object.create(null);
            const b = Object.create(null);
            expect(_equals(a, b), is, true);
        },
    };
}
