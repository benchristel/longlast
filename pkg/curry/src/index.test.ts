import {curry} from "#@longlast/curry";
import {$getBoundArguments, $unapplied} from "@longlast/symbols";
import {test, expect, equals, is} from "@benchristel/taste";
import {testFunctionCurrying} from "../api/currying.spec.ts";
import {testMetadata} from "../api/metadata.spec.ts";

testFunctionCurrying(curry, "curry");
testMetadata(curry, "curry");

const add2 = curry((a: number, b: number) => a + b);

test("a 2-ary curried function", {
    "remembers all bound arguments from a sequence of calls"() {
        expect(add2(1)[$getBoundArguments](), equals, [1]);
    },

    "remembers the original curried function after partial application"() {
        expect(add2(1)[$unapplied], is, add2);
    },

    "can be called multiple times after partial application"() {
        expect([1, 2, 3].map(add2(1)), equals, [2, 3, 4]);
    },
});

const add3 = curry((a: number, b: number, c: number) => a + b + c);

test("a 3-ary curried function", {
    "remembers all bound arguments from a sequence of calls"() {
        expect(add3(1)(2)[$getBoundArguments](), equals, [1, 2]);
    },

    "remembers the original curried function after partial application"() {
        expect(add3(1)(2)[$unapplied], is, add3);
    },

    "can be called multiple times after partial application"() {
        expect([1, 2, 3].map(add3(1)(2)), equals, [4, 5, 6]);
        // Array.map passes the index as the second argument.
        expect([1, 2, 3].map(add3(1)), equals, [2, 4, 6]);
    },
});

const add4 = curry(
    (a: number, b: number, c: number, d: number) => a + b + c + d,
);

test("a 4-ary curried function", {
    "remembers all bound arguments from a sequence of calls"() {
        expect(add4(1)[$getBoundArguments](), equals, [1]);
        expect(add4(1)(2)[$getBoundArguments](), equals, [1, 2]);
        expect(add4(1)(2)(3)[$getBoundArguments](), equals, [1, 2, 3]);
    },

    "remembers the original curried function after partial application"() {
        expect(add4(1)(2)(3)[$unapplied], is, add4);
    },

    "can be called multiple times after partial application"() {
        expect([1, 2, 3].map(add4(1)(2)(3)), equals, [7, 8, 9]);
        // Array.map passes the index as the second argument.
        expect([1, 2, 3].map(add4(1, 2)), equals, [4, 6, 8]);
    },
});
