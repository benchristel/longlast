import {expect, is} from "@benchristel/taste";
import {curry} from "@longlast/curry";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function functionComparisonSpec(_equals: EqualsFn): Spec {
    return {
        "distinguishes different functions"() {
            const a = () => {};
            const b = () => {};
            expect(_equals(a, b), is, false);
        },

        "equates a function with itself"() {
            const f = () => {};
            expect(_equals(f, f), is, true);
        },

        "equates a curried function with itself"() {
            const add = curry((a: number, b: number) => a + b);
            expect(_equals(add, add), is, true);
        },

        "equates partial applications with equal arguments"() {
            const concat = curry((a: unknown[], b: unknown[]) => a.concat(b));
            expect(_equals(concat([1]), concat([1])), is, true);
        },

        "distinguishes partial applications of different functions"() {
            const concat1 = curry((a: unknown[], b: unknown[]) => a.concat(b));
            const concat2 = curry((a: unknown[], b: unknown[]) => a.concat(b));
            expect(_equals(concat1([1]), concat2([1])), is, false);
        },

        "distinguishes partial applications with different arguments"() {
            const concat = curry((a: unknown[], b: unknown[]) => a.concat(b));
            expect(_equals(concat([1]), concat([99])), is, false);
        },
    };
}
