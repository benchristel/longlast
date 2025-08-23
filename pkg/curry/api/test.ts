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

const curriedConcat3 = curry((s: string, x: number, b: boolean) => s + x + b);

test("a curried 3-ary function", {
    "can be passed all arguments at once"() {
        expect(curriedConcat3("a", 1, true), is, "a1true");
    },

    "can be passed its arguments one at a time"() {
        expect(curriedConcat3("a")(1)(true), is, "a1true");
    },

    "can be passed two arguments, then one"() {
        expect(curriedConcat3("a", 1)(true), is, "a1true");
    },

    "can be passed one argument, then two"() {
        expect(curriedConcat3("a")(1, true), is, "a1true");
    },
});
