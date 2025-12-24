import {test, expect, is} from "@benchristel/taste";
import {startWith} from "#@longlast/flow";

const double = (x: number) => 2 * x;

test("startWith", {
    "starts a pipeline to transform the given value"() {
        const value = startWith(7).and(double).result();
        expect(value, is, 14);
    },
});
