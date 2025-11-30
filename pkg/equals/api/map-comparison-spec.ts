import {expect, is} from "@benchristel/taste";
import {$equals} from "@longlast/symbols";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function mapComparisonSpec(_equals: EqualsFn): Spec {
    return {
        "equates empty maps"() {
            const a = new Map();
            const b = new Map();
            expect(_equals(a, b), is, true);
        },

        "distinguishes maps with different sizes"() {
            const a = new Map();
            const b = new Map();
            a.set("key", "value");
            expect(_equals(a, b), is, false);
        },

        "distinguishes maps with different keys"() {
            const a = new Map();
            const b = new Map();
            a.set("key1", "value");
            b.set("key2", "value");
            expect(_equals(a, b), is, false);
        },

        "distinguishes maps with different values"() {
            const a = new Map();
            const b = new Map();
            a.set("key", "value1");
            b.set("key", "value2");
            expect(_equals(a, b), is, false);
        },

        "distinguishes a missing map key from undefined"() {
            const a = new Map();
            const b = new Map();
            a.set("key1", undefined);
            b.set("key2", undefined);
            expect(_equals(a, b), is, false);
        },

        "deeply compares map values"() {
            const a = new Map();
            const b = new Map();
            a.set("key1", {foo: 1});
            b.set("key1", {foo: 1});
            expect(_equals(a, b), is, true);
        },

        "respects asymmetric comparisons between map values"() {
            const a = new Map();
            const b = new Map();
            const equalToAnything = {[$equals]: () => true};
            a.set("key1", equalToAnything);
            b.set("key1", {foo: 1});
            expect(_equals(a, b), is, true);
        },

        "ignores the order of map keys"() {
            // Per MDN, "The Map object ... remembers the original insertion
            // order of the keys."
            const a = new Map();
            a.set("1", "1");
            a.set("2", "2");

            const b = new Map();
            b.set("2", "2");
            b.set("1", "1");

            expect(_equals(a, b), is, true);
        },
    };
}
