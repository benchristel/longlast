import {expect, is} from "@benchristel/taste";
import {type equals} from "#@longlast/equals";

type Spec = Record<string, () => void>;

export function errorComparisonSpec(_equals: typeof equals): Spec {
    return {
        "equates Errors with equal messages"() {
            const a = new Error("a");
            const b = new Error("a");
            expect(_equals(a, b), is, true);
        },

        "distinguishes Errors with different messages"() {
            const a = new Error("a");
            const b = new Error("b");
            expect(_equals(a, b), is, false);
        },

        "distinguishes Errors with different classes"() {
            class TestError extends Error {}
            expect(_equals(new TestError("a"), new Error("a")), is, false);
            expect(_equals(new Error("a"), new TestError("a")), is, false);
        },

        "equates instances of the same Error subclass"() {
            class TestError extends Error {}
            const a = new TestError("x");
            const b = new TestError("x");
            expect(_equals(a, b), is, true);
        },

        "ignores nonstandard properties of Error subclasses"() {
            class TestError extends Error {}
            const a = new TestError("x");
            const b = new TestError("x");
            (a as any).nonstandard = 1;
            expect(_equals(a, b), is, true);
        },
    };
}
