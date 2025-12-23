import {expect, is} from "@benchristel/taste";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function typedArrayComparisonSpec(_equals: EqualsFn): Spec {
    return {
        "equates equal typed arrays"() {
            const a = new Uint8Array([1, 2]);
            const b = new Uint8Array([1, 2]);
            expect(_equals(a, b), is, true);
        },

        "compares typed arrays byte-for-byte"() {
            // The highest value for an unsigned byte is 255;
            // 256 rolls over to zero.
            const a = new Uint8Array([256]);
            const b = new Uint8Array([0]);
            expect(_equals(a, b), is, true);
        },

        "distinguishes typed arrays with different lengths"() {
            const a = new Uint8Array([1, 2]);
            const b = new Uint8Array([1, 2, 3]);
            expect(_equals(a, b), is, false);
        },

        "distinguishes typed arrays with different elements"() {
            const a = new Uint8Array([1, 2]);
            const b = new Uint8Array([1, 9]);
            expect(_equals(a, b), is, false);
        },

        "distinguishes typed arrays with different data sizes"() {
            const a = new Uint8Array([1, 2]);
            const b = new Uint16Array([1, 2]);
            expect(_equals(a, b), is, false);
        },

        "distinguishes signed typed arrays from unsigned"() {
            const a = new Uint8Array([1, 2]);
            const b = new Int8Array([1, 2]);
            expect(_equals(a, b), is, false);
        },
    };
}
