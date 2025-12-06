import {test, expect, is} from "@benchristel/taste";
import {curry} from "#@longlast/curry";

test("curry", {
    "returns a function"() {
        const add = (a: number, b: number) => a + b;
        expect(curry(add)(1)(2), is, 3);
    },
});
