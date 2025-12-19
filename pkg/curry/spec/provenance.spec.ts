import {type curry} from "#@longlast/curry";
import {$unapplied, $getBoundArguments} from "@longlast/symbols";
import {test, expect, is, equals} from "@benchristel/taste";

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

        "sets the [$unapplied] property on the curried function"() {
            function foo(_a: 1, _b: 2) {}
            const curried = _curry(foo);
            expect(curried[$unapplied], is, curried);
        },

        "sets bound arguments on the curried function"() {
            const curried = _curry((_a: 1, _b: 2) => {});
            expect(curried[$getBoundArguments](), equals, []);
        },

        "tracks bound arguments on partially applied functions"() {
            const curried = _curry((_a: 1, _b: 2) => {});
            expect(curried(1)[$getBoundArguments](), equals, [1]);
        },

        "sets [$unapplied] on partially applied functions"() {
            const curried = _curry((_a: 1, _b: 2) => {});
            expect(curried(1)[$unapplied], equals, curried);
        },

        "sets displayName on partially applied functions"() {
            function foo(_a: 1, _b: 2) {}
            const curried = _curry(foo);
            expect(curried(1).displayName, equals, "foo");
        },
    });
}
