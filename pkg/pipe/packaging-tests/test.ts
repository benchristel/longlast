import {pipe} from "#@longlast/pipe";
import {test, expect, is} from "@benchristel/taste";

const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;

const embiggen = pipe(increment, double);

test("pipe", {
    "creates a function"() {
        expect(embiggen(0), is, 2);
        expect(embiggen(2), is, 6);
    },
});
