import {type curry} from "#@longlast/curry";
import {$unapplied, $getBoundArguments} from "@longlast/symbols";
import {test, expect, is, equals} from "@benchristel/taste";

export function testMetadata(_curry: typeof curry, subjectName: string): void {
    test(subjectName, {
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

        "sets bound arguments on a 2-ary curried function"() {
            const curried = _curry((_a: 1, _b: 2) => {});
            expect(curried[$getBoundArguments](), equals, []);
        },

        "sets bound arguments on a 3-ary curried function"() {
            const curried = _curry((_a: 1, _b: 2, _c: 3) => {});
            expect(curried[$getBoundArguments](), equals, []);
        },

        "sets bound arguments on a 4-ary curried function"() {
            const curried = _curry((_a: 1, _b: 2, _c: 3, _d: 4) => {});
            expect(curried[$getBoundArguments](), equals, []);
        },

        "sets bound arguments on a 5-ary curried function"() {
            const curried = _curry((_a: 1, _b: 2, _c: 3, _d: 4, _e: 5) => {});
            expect(curried[$getBoundArguments](), equals, []);
        },
    });

    const curriedConcat2 = _curry((s: string, x: number) => s + x);
    curriedConcat2.displayName = "concat2";

    test(`a 2-ary function from ${subjectName}`, {
        "keeps its name after partial application"() {
            expect(curriedConcat2("a").displayName, is, "concat2");
        },

        "remembers the unapplied function after partial application"() {
            expect(curriedConcat2("a")[$unapplied], is, curriedConcat2);
        },

        "remembers its bound argument"() {
            expect(curriedConcat2("a")[$getBoundArguments](), equals, ["a"]);
        },
    });

    const curriedConcat3 = _curry(
        (s: string, x: number, b: boolean) => s + x + b,
    );
    curriedConcat3.displayName = "concat3";

    test(`a 3-ary function from ${subjectName}`, {
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
            const args = curriedConcat3("a")[$getBoundArguments]();
            expect(args, equals, ["a"]);
        },

        "remembers two bound arguments"() {
            const args = curriedConcat3("a", 1)[$getBoundArguments]();
            expect(args, equals, ["a", 1]);
        },
    });

    const curriedConcat4 = _curry(
        (a: string, b: number, c: boolean, d: BigInt) => a + b + c + d,
    );
    curriedConcat4.displayName = "concat4";

    test(`a 4-ary function from ${subjectName}`, {
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
            const args = curriedConcat4("a")[$getBoundArguments]();
            expect(args, equals, ["a"]);
        },

        "remembers two bound arguments"() {
            const args = curriedConcat4("a", 1)[$getBoundArguments]();
            expect(args, equals, ["a", 1]);
        },

        "remembers three bound arguments"() {
            const args = curriedConcat4("a", 1, true)[$getBoundArguments]();
            expect(args, equals, ["a", 1, true]);
        },
    });

    const curriedConcat5 = _curry(
        (a: string, b: number, c: boolean, d: BigInt, e: string) =>
            a + b + c + d + e,
    );
    curriedConcat5.displayName = "concat5";

    test(`a 5-ary function from ${subjectName}`, {
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
            const args = curriedConcat5("a")[$getBoundArguments]();
            expect(args, equals, ["a"]);
        },

        "remembers two bound arguments"() {
            const args = curriedConcat5("a", 1)[$getBoundArguments]();
            expect(args, equals, ["a", 1]);
        },

        "remembers three bound arguments"() {
            const args = curriedConcat5("a", 1, true)[$getBoundArguments]();
            expect(args, equals, ["a", 1, true]);
        },

        "remembers four bound arguments"() {
            const args = curriedConcat5("a", 1, true, 2n)[$getBoundArguments]();
            expect(args, equals, ["a", 1, true, 2n]);
        },
    });
}
