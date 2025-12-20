import {type curry} from "#@longlast/curry";
import {test, expect, is, equals} from "@benchristel/taste";
import {getBoundArguments, getUnapplied} from "@longlast/function-provenance";

export function testProvenanceTracking(
    _curry: typeof curry,
    subjectName: string,
): void {
    test(subjectName, {
        "names a curried function after the original function"() {
            function foo(_a: 1, _b: 2) {}
            // TODO: (pre-1.0.0) Don't read `displayName` in these tests.
            expect(_curry(foo).displayName, is, "foo");
        },

        "prefers `displayName` over `name` when naming a curried function"() {
            function foo(_a: 1, _b: 2) {}
            foo.displayName = "theDisplayName";
            expect(_curry(foo).displayName, is, "theDisplayName");
        },

        "can be unapplied"() {
            function foo(_a: 1, _b: 2) {}
            const curried = _curry(foo);
            expect(getUnapplied(curried), is, curried);
        },

        "sets bound arguments on the curried function"() {
            const curried = _curry((_a: 1, _b: 2) => {});
            expect(getBoundArguments(curried), equals, []);
        },

        "tracks bound arguments on partially applied functions"() {
            const curried = _curry((_a: 1, _b: 2) => {});
            expect(getBoundArguments(curried(1)), equals, [1]);
        },

        "sets [$unapplied] on partially applied functions"() {
            const curried = _curry((_a: 1, _b: 2) => {});
            expect(getUnapplied(curried(1)), equals, curried);
        },

        "sets displayName on partially applied functions"() {
            function foo(_a: 1, _b: 2) {}
            const curried = _curry(foo);
            expect(curried(1).displayName, equals, "foo");
        },
    });
}
