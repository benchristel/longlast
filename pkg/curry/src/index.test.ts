import {curry} from "#@longlast/curry";
import {test, expect, equals, is} from "@benchristel/taste";
import {testFunctionCurrying} from "../spec/currying.spec.ts";
import {testProvenanceTracking} from "../spec/provenance.spec.ts";
import {getBoundArguments, getUnapplied} from "@longlast/function-provenance";

testFunctionCurrying(curry, "curry");
testProvenanceTracking(curry, "curry");

const concat2 = curry((a: string, b: string) => `${a}${b}`);

test("a 2-ary curried function", {
    "can be passed both arguments at once"() {
        expect(concat2("a", "b"), equals, "ab");
    },

    "can be passed its arguments one at a time"() {
        expect(concat2("x")("y"), equals, "xy");
    },

    "remembers all bound arguments from a sequence of calls"() {
        expect(getBoundArguments(concat2("a")), equals, ["a"]);
    },

    "remembers the original curried function after partial application"() {
        expect(getUnapplied(concat2("a")), is, concat2);
    },

    "can be called multiple times after partial application"() {
        expect(["x", "y", "z"].map(concat2("a")), equals, ["ax", "ay", "az"]);
    },
});

const concat3 = curry((a: string, b: string, c: string) => `${a}${b}${c}`);

test("a 3-ary curried function", {
    "can be passed all arguments at once"() {
        expect(concat3("a", "b", "c"), is, "abc");
    },

    "can be passed its arguments one at a time"() {
        expect(concat3("a")("b")("c"), is, "abc");
    },

    "can be passed one argument, then two"() {
        expect(concat3("a")("b", "c"), is, "abc");
    },

    "can be passed two arguments, then one"() {
        expect(concat3("a", "b")("c"), is, "abc");
    },

    "remembers all bound arguments from a sequence of calls"() {
        expect(getBoundArguments(concat3("a")("b")), equals, ["a", "b"]);
    },

    "remembers the original curried function after partial application"() {
        expect(getUnapplied(concat3("a")("b")), is, concat3);
    },

    "can be called multiple times after partial application"() {
        const result = ["x", "y", "z"].map(concat3("a")("b"));
        expect(result, equals, ["abx", "aby", "abz"]);
    },
});

const concat4 = curry(
    (a: string, b: string, c: string, d: string) => `${a}${b}${c}${d}`,
);

test("a 4-ary curried function", {
    "can be passed all arguments at once"() {
        expect(concat4("a", "b", "c", "d"), is, "abcd");
    },

    "can be passed its arguments one at a time"() {
        expect(concat4("a")("b")("c")("d"), is, "abcd");
    },

    "remembers all bound arguments from a sequence of calls"() {
        expect(getBoundArguments(concat4("a")), equals, ["a"]);
        expect(getBoundArguments(concat4("a")("b")), equals, ["a", "b"]);
        expect(getBoundArguments(concat4("a")("b")("c")), equals, [
            "a",
            "b",
            "c",
        ]);
    },

    "remembers the original curried function after partial application"() {
        expect(getUnapplied(concat4("a")("b")("c")), is, concat4);
    },

    "can be called multiple times after partial application"() {
        expect(["x", "y", "z"].map(concat4("a")("b")("c")), equals, [
            "abcx",
            "abcy",
            "abcz",
        ]);
    },
});
