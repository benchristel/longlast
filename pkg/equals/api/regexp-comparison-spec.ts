import {expect, is} from "@benchristel/taste";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function regexpComparisonSpec(_equals: EqualsFn): Spec {
    return {
        "equates equal RegExp objects"() {
            const a = /x/;
            const b = /x/;
            expect(_equals(a, b), is, true);
        },

        "distinguishes different RegExp objects"() {
            const a = /x/;
            const b = /y/;
            expect(_equals(a, b), is, false);
        },

        "distinguishes RegExp objects that differ only by flags"() {
            const a = /x/;
            const b = /x/i;
            expect(_equals(a, b), is, false);
        },

        "ignores RegExp flag order"() {
            const a = /x/gi;
            const b = /x/gi;
            expect(_equals(a, b), is, true);
        },
    };
}
