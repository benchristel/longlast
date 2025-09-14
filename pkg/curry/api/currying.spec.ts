import {test, expect, is} from "@benchristel/taste";
import {type curry} from "#@longlast/curry";

export function testFunctionCurrying(
    _curry: typeof curry,
    subjectName: string,
): void {
    const curriedConcat2 = _curry((s: string, x: number) => s + x);
    curriedConcat2.displayName = "concat2";

    test(`a 2-ary function from ${subjectName}`, {
        "can be passed both arguments at once"() {
            expect(curriedConcat2("a", 1), is, "a1");
        },

        "can be passed its arguments one at a time"() {
            expect(curriedConcat2("a")(1), is, "a1");
        },
    });

    const curriedConcat3 = _curry(
        (s: string, x: number, b: boolean) => s + x + b,
    );
    curriedConcat3.displayName = "concat3";

    test(`a 3-ary function from ${subjectName}`, {
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

    const curriedConcat4 = _curry(
        (a: string, b: number, c: boolean, d: BigInt) => a + b + c + d,
    );
    curriedConcat4.displayName = "concat4";

    test(`a 4-ary function from ${subjectName}`, {
        "can be passed all arguments at once"() {
            expect(curriedConcat4("a", 1, true, 2n), is, "a1true2");
        },

        "can be passed its arguments one at a time"() {
            expect(curriedConcat4("a")(1)(true)(2n), is, "a1true2");
        },

        "can be passed its arguments 3, 1"() {
            expect(curriedConcat4("a", 1, true)(2n), is, "a1true2");
        },

        "can be passed its arguments 2, 2"() {
            expect(curriedConcat4("a", 1)(true, 2n), is, "a1true2");
        },

        "can be passed its arguments 2, 1, 1"() {
            expect(curriedConcat4("a", 1)(true)(2n), is, "a1true2");
        },

        "can be passed its arguments 1, 3"() {
            expect(curriedConcat4("a")(1, true, 2n), is, "a1true2");
        },

        "can be passed its arguments 1, 2, 1"() {
            expect(curriedConcat4("a")(1, true)(2n), is, "a1true2");
        },

        "can be passed its arguments 1, 1, 2"() {
            expect(curriedConcat4("a")(1)(true, 2n), is, "a1true2");
        },
    });

    const curriedConcat5 = _curry(
        (a: string, b: number, c: boolean, d: BigInt, e: string) =>
            a + b + c + d + e,
    );
    curriedConcat5.displayName = "concat5";

    test(`a 5-ary function from ${subjectName}`, {
        "can be passed all arguments at once"() {
            expect(curriedConcat5("a", 1, true, 2n, "b"), is, "a1true2b");
        },

        "can be passed its arguments one at a time"() {
            expect(curriedConcat5("a")(1)(true)(2n)("b"), is, "a1true2b");
        },

        "can be passed its arguments 4, 1"() {
            expect(curriedConcat5("a", 1, true, 2n)("b"), is, "a1true2b");
        },

        "can be passed its arguments 3, 2"() {
            expect(curriedConcat5("a", 1, true)(2n, "b"), is, "a1true2b");
        },

        "can be passed its arguments 3, 1, 1"() {
            expect(curriedConcat5("a", 1, true)(2n)("b"), is, "a1true2b");
        },

        "can be passed its arguments 2, 3"() {
            expect(curriedConcat5("a", 1)(true, 2n, "b"), is, "a1true2b");
        },

        "can be passed its arguments 2, 2, 1"() {
            expect(curriedConcat5("a", 1)(true, 2n)("b"), is, "a1true2b");
        },

        "can be passed its arguments 2, 1, 2"() {
            expect(curriedConcat5("a", 1)(true)(2n, "b"), is, "a1true2b");
        },

        "can be passed its arguments 2, 1, 1, 1"() {
            expect(curriedConcat5("a", 1)(true)(2n)("b"), is, "a1true2b");
        },

        "can be passed its arguments 1, 4"() {
            expect(curriedConcat5("a")(1, true, 2n, "b"), is, "a1true2b");
        },

        "can be passed its arguments 1, 3, 1"() {
            expect(curriedConcat5("a")(1, true, 2n)("b"), is, "a1true2b");
        },

        "can be passed its arguments 1, 2, 2"() {
            expect(curriedConcat5("a")(1, true)(2n, "b"), is, "a1true2b");
        },

        "can be passed its arguments 1, 2, 1, 1"() {
            expect(curriedConcat5("a")(1, true)(2n)("b"), is, "a1true2b");
        },

        "can be passed its arguments 1, 1, 3"() {
            expect(curriedConcat5("a")(1)(true, 2n, "b"), is, "a1true2b");
        },

        "can be passed its arguments 1, 1, 2, 1"() {
            expect(curriedConcat5("a")(1)(true, 2n)("b"), is, "a1true2b");
        },

        "can be passed its arguments 1, 1, 1, 2"() {
            expect(curriedConcat5("a")(1)(true)(2n, "b"), is, "a1true2b");
        },
    });
}
