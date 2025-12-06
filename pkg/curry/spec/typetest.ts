import {describe, it, test, expect} from "tstyche";
import {
    curry,
    type Curried2,
    type Curried3,
    type Curried4,
    type Curried5,
} from "#@longlast/curry";

declare function twoArgs(a: 1, b: 2): 3;

test("a curried 2-ary function", () => {
    const curried = curry(twoArgs);
    expect(curried).type.toBeAssignableTo<(a: 1, b: 2) => 3>();
    expect(curried).type.toBeAssignableTo<(a: 1, b: 2, x: unknown) => 3>();

    expect(curried(1)).type.toBeAssignableTo<(b: 2) => 3>();
    expect(curried(1)).type.toBeAssignableTo<(b: 2, x: unknown) => 3>();
});

declare function threeArgs(a: 1, b: 2, c: 3): 4;

describe("a curried 3-ary function", () => {
    const curried = curry(threeArgs);

    it("has the expected type", () => {
        expect(curried).type.toBeAssignableTo<(a: 1, b: 2, c: 3) => 4>();
    });

    it("ignores extra arguments", () => {
        expect(curried).type.toBeAssignableTo<
            (a: 1, b: 2, c: 3, extra: unknown) => 4
        >();
    });

    it("has the expected type after partial application", () => {
        expect(curried(1)).type.toBeAssignableTo<(b: 2, c: 3) => 4>();
        expect(curried(1)).type.toBeAssignableTo<(b: 2) => (c: 3) => 4>();
        expect(curried(1)(2)).type.toBeAssignableTo<(c: 3) => 4>();
        expect(curried(1, 2)).type.toBeAssignableTo<(c: 3) => 4>();
    });

    it("ignores extra arguments after partial application", () => {
        expect(curried(1)).type.toBeAssignableTo<
            (b: 2, c: 3, extra: unknown) => 4
        >();
        expect(curried(1)(2)).type.toBeAssignableTo<
            (c: 3, extra: unknown) => 4
        >();
        expect(curried(1, 2)).type.toBeAssignableTo<
            (c: 3, extra: unknown) => 4
        >();
    });

    it("can be used with Array.map()", () => {
        expect([3 as const].map(curried(1, 2))).type.toBe<4[]>();
    });

    it("can't be used with Array.map() when the wrong argument type would be passed", () => {
        // @ts-expect-error - Array.map() passes the index as the second
        // argument
        [2 as const].map(curried(1));
    });
});

test("the Curried2 type is not user-constructible", () => {
    expect((_a: 1, _b?: 2): any => 0).type.not.toBeAssignableTo<
        Curried2<any, any, any>
    >();
});

test("the Curried3 type is not user-constructible", () => {
    expect((_a: 1, _b?: 2, _c?: 3): any => 0).type.not.toBeAssignableTo<
        Curried3<any, any, any, any>
    >();
});

test("the Curried4 type is not user-constructible", () => {
    expect((_a: 1, _b?: 2, _c?: 3, _d?: 4): any => 0).type.not.toBeAssignableTo<
        Curried4<any, any, any, any, any>
    >();
});

test("the Curried5 type is not user-constructible", () => {
    expect(
        (_a: 1, _b?: 2, _c?: 3, _d?: 4, _e?: 5): any => 0,
    ).type.not.toBeAssignableTo<Curried5<any, any, any, any, any, any>>();
});
