import {expect, is} from "@benchristel/taste";
import {type equals} from "#@longlast/equals";

type Spec = Record<string, () => void>;

export function dateComparisonSpec(_equals: typeof equals): Spec {
    return {
        "equates equal dates"() {
            const a = new Date("1999-12-21");
            const b = new Date("1999-12-21");
            expect(_equals(a, b), is, true);
        },

        "distinguishes different dates"() {
            const a = new Date("1999-12-21 00:00:00.000Z");
            const b = new Date("1999-12-21 00:00:00.001Z");
            expect(_equals(a, b), is, false);
        },

        "equates invalid Dates"() {
            const a = new Date("asdf");
            const b = new Date("jkl;");
            expect(_equals(a, b), is, true);
        },

        "distinguishes a valid Date from an invalid one"() {
            const a = new Date("1999-12-21");
            const b = new Date("asdf");
            expect(_equals(a, b), is, false);
        },
    };
}
