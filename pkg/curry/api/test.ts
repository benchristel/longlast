import {test, expect, is} from "@benchristel/taste";
import {curry} from "../src/index.ts";

test("curry", {
    "returns a function"() {
        expect(typeof curry(() => {}), is, "function");
    },
});

const curriedConcat2 = curry((s: string, x: number) => s + x);

test("a curried 2-ary function", {
    "can be passed both arguments at once"() {
        expect(curriedConcat2("a", 1), is, "a1");
    },

    "can be passed its arguments one at a time"() {
        expect(curriedConcat2("a")(1), is, "a1");
    },
});
