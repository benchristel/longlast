import {type curry} from "#@longlast/curry";
import {test, expect, is, equals} from "@benchristel/taste";
import {getFunctionName} from "@longlast/function-name";
import {getBoundArguments, getUnapplied} from "@longlast/function-provenance";

export function testProvenanceTracking(
    _curry: typeof curry,
    subjectName: string,
): void {
    test(subjectName, {
        "names a curried function after the original function"() {
            function foo(_a: 1, _b: 2) {}
            expect(getFunctionName(_curry(foo)), is, "foo");
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

        "names partially applied functions"() {
            function foo(_a: 1, _b: 2) {}
            const curried = _curry(foo);
            expect(getFunctionName(curried(1)), equals, "foo");
        },
    });
}
