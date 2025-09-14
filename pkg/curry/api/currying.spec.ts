import {test, expect, is, equals} from "@benchristel/taste";
import {type curry} from "#@longlast/curry";
import {$boundArguments, $unapplied} from "@longlast/symbols";

export function testFunctionCurrying(
    _curry: typeof curry,
    subjectName: string,
): void {
    test(subjectName, {
        "returns a function"() {
            expect(typeof _curry(() => {}), is, "function");
        },

        "names the curried function after the original function"() {
            function foo() {}
            expect(_curry(foo).displayName, is, "foo");
        },

        "names a curried 2-ary function after the original function"() {
            function foo(_a: 1, _b: 2) {}
            expect(_curry(foo).displayName, is, "foo");
        },

        "names a curried 3-ary function after the original function"() {
            function foo(_a: 1, _b: 2, _c: 3) {}
            expect(_curry(foo).displayName, is, "foo");
        },

        "names a curried 4-ary function after the original function"() {
            function foo(_a: 1, _b: 2, _c: 3, _d: 4) {}
            expect(_curry(foo).displayName, is, "foo");
        },

        "names a curried 5-ary function after the original function"() {
            function foo(_a: 1, _b: 2, _c: 3, _d: 4, _e: 5) {}
            expect(_curry(foo).displayName, is, "foo");
        },

        "sets the $unapplied property on a 2-ary curried function"() {
            function foo(_a: 1, _b: 2) {}
            const curried = _curry(foo);
            expect(curried[$unapplied], is, curried);
        },

        "sets the $unapplied property on a 3-ary curried function"() {
            function foo(_a: 1, _b: 2, _c: 3) {}
            const curried = _curry(foo);
            expect(curried[$unapplied], is, curried);
        },

        "sets the $unapplied property on a 4-ary curried function"() {
            function foo(_a: 1, _b: 2, _c: 3, _d: 4) {}
            const curried = _curry(foo);
            expect(curried[$unapplied], is, curried);
        },

        "sets the $unapplied property on a 5-ary curried function"() {
            function foo(_a: 1, _b: 2, _c: 3, _d: 4, _e: 5) {}
            const curried = _curry(foo);
            expect(curried[$unapplied], is, curried);
        },
    });

    const curriedConcat2 = _curry((s: string, x: number) => s + x);
    curriedConcat2.displayName = "concat2";

    test(`a 2-ary function from ${subjectName}`, {
        "can be passed both arguments at once"() {
            expect(curriedConcat2("a", 1), is, "a1");
        },

        "can be passed its arguments one at a time"() {
            expect(curriedConcat2("a")(1), is, "a1");
        },

        "has no $boundArguments before partial application"() {
            expect(curriedConcat2[$boundArguments], equals, []);
        },

        "keeps its name after partial application"() {
            expect(curriedConcat2("a").displayName, is, "concat2");
        },

        "remembers the unapplied function after partial application"() {
            expect(curriedConcat2("a")[$unapplied], is, curriedConcat2);
        },

        "remembers its bound argument"() {
            expect(curriedConcat2("a")[$boundArguments], equals, ["a"]);
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

        "has no $boundArguments before partial application"() {
            expect(curriedConcat3[$boundArguments], equals, []);
        },

        "keeps its name after partial application of one argument"() {
            expect(curriedConcat3("a").displayName, is, "concat3");
        },

        "keeps its name after partial application of two arguments"() {
            expect(curriedConcat3("a", 1).displayName, is, "concat3");
        },

        "remembers the unapplied function after partial application of one argument"() {
            expect(curriedConcat3("a")[$unapplied], is, curriedConcat3);
        },

        "remembers the unapplied function after partial application of two arguments"() {
            expect(curriedConcat3("a", 1)[$unapplied], is, curriedConcat3);
        },

        "remembers one bound argument"() {
            expect(curriedConcat3("a")[$boundArguments], equals, ["a"]);
        },

        "remembers two bound arguments"() {
            expect(curriedConcat3("a", 1)[$boundArguments], equals, ["a", 1]);
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

        "has no $boundArguments before partial application"() {
            expect(curriedConcat4[$boundArguments], equals, []);
        },

        "keeps its name after partial application of one argument"() {
            expect(curriedConcat4("a").displayName, is, "concat4");
        },

        "keeps its name after partial application of two arguments"() {
            expect(curriedConcat4("a", 1).displayName, is, "concat4");
        },

        "keeps its name after partial application of three arguments"() {
            expect(curriedConcat4("a", 1, true).displayName, is, "concat4");
        },

        "remembers the unapplied function after partial application of one argument"() {
            expect(curriedConcat4("a")[$unapplied], is, curriedConcat4);
        },

        "remembers the unapplied function after partial application of two arguments"() {
            expect(curriedConcat4("a", 1)[$unapplied], is, curriedConcat4);
        },

        "remembers the unapplied function after partial application of three arguments"() {
            const unapplied = curriedConcat4("a", 1, true)[$unapplied];
            expect(unapplied, is, curriedConcat4);
        },

        "remembers one bound argument"() {
            expect(curriedConcat4("a")[$boundArguments], equals, ["a"]);
        },

        "remembers two bound arguments"() {
            expect(curriedConcat4("a", 1)[$boundArguments], equals, ["a", 1]);
        },

        "remembers three bound arguments"() {
            const args = curriedConcat4("a", 1, true)[$boundArguments];
            expect(args, equals, ["a", 1, true]);
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

        "has no $boundArguments before partial application"() {
            expect(curriedConcat5[$boundArguments], equals, []);
        },

        "keeps its name after partial application of one argument"() {
            expect(curriedConcat5("a").displayName, is, "concat5");
        },

        "keeps its name after partial application of two arguments"() {
            expect(curriedConcat5("a", 1).displayName, is, "concat5");
        },

        "keeps its name after partial application of three arguments"() {
            expect(curriedConcat5("a", 1, true).displayName, is, "concat5");
        },

        "keeps its name after partial application of four arguments"() {
            expect(curriedConcat5("a", 1, true, 2n).displayName, is, "concat5");
        },

        "remembers one bound argument"() {
            expect(curriedConcat5("a")[$boundArguments], equals, ["a"]);
        },

        "remembers two bound arguments"() {
            expect(curriedConcat5("a", 1)[$boundArguments], equals, ["a", 1]);
        },

        "remembers three bound arguments"() {
            const args = curriedConcat5("a", 1, true)[$boundArguments];
            expect(args, equals, ["a", 1, true]);
        },

        "remembers four bound arguments"() {
            const args = curriedConcat5("a", 1, true, 2n)[$boundArguments];
            expect(args, equals, ["a", 1, true, 2n]);
        },
    });
}
