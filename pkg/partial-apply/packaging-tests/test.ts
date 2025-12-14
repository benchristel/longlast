import {test, expect, is} from "@benchristel/taste";
import {partialApply} from "#@longlast/partial-apply";

function add(a: number, b: number): number {
    return a + b;
}

test("partialApply", {
    "binds an argument"() {
        const increment = partialApply(1, add);
        expect(increment(5), is, 6);
    },
});
