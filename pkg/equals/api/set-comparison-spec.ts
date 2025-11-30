import {expect, is} from "@benchristel/taste";
import {type equals} from "#@longlast/equals";

type Spec = Record<string, () => void>;

export function setComparisonSpec(_equals: typeof equals): Spec {
    return {
        "distinguishes sets with different sizes"() {
            const a = new Set([1]);
            const b = new Set([]);
            expect(_equals(a, b), is, false);
        },

        "distinguishes sets with different members"() {
            const a = new Set([1]);
            const b = new Set([2]);
            expect(_equals(a, b), is, false);
        },

        "equates sets with identical members"() {
            const a = new Set([1, 2]);
            const b = new Set([1, 2]);
            expect(_equals(a, b), is, true);
        },

        "distinguishes sets with equal but not identical members"() {
            const a = new Set([{}]);
            const b = new Set([{}]);
            expect(_equals(a, b), is, false);
        },

        "equates sets whose members are identical but not ==="() {
            const a = new Set([NaN]);
            const b = new Set([NaN]);
            expect(_equals(a, b), is, true);
        },

        "distinguishes sets whose members are === but not identical"() {
            const a = new Set([0]);
            const b = new Set([-0]);
            expect(_equals(a, b), is, true);
        },
    };
}
