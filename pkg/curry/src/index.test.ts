import {curry} from "#@longlast/curry";
import {$boundArguments} from "@longlast/symbols";
import {test, expect, equals} from "@benchristel/taste";
import {behavesLikeCurry} from "../api/spec.ts";

behavesLikeCurry(curry, "curry");

const add3 = curry((a: number, b: number, c: number) => a + b + c);

test("a 3-ary curried function", {
    "remembers all bound arguments from a sequence of calls"() {
        expect(add3(1)(2)[$boundArguments], equals, [1, 2]);
    },
});

const add4 = curry(
    (a: number, b: number, c: number, d: number) => a + b + c + d,
);

test("a 4-ary curried function", {
    "remembers all bound arguments from a sequence of calls"() {
        expect(add4(1)[$boundArguments], equals, [1]);
        expect(add4(1)(2)[$boundArguments], equals, [1, 2]);
        expect(add4(1)(2)(3)[$boundArguments], equals, [1, 2, 3]);
    },
});
