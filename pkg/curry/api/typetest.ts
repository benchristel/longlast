import {test, expect} from "tstyche";
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

test("a curried 3-ary function", () => {
    const curried = curry(threeArgs);
    expect(curried).type.toBeAssignableTo<(a: 1, b: 2, c: 3) => 4>();
    expect(curried).type.toBeAssignableTo<
        (a: 1, b: 2, c: 3, x: unknown) => 4
    >();

    expect(curried(1)).type.toBeAssignableTo<(b: 2, c: 3) => 4>();
    expect(curried(1)).type.toBeAssignableTo<(b: 2, c: 3, x: unknown) => 4>();

    expect(curried(1)(2)).type.toBeAssignableTo<(c: 3) => 4>();
    expect(curried(1)(2)).type.toBeAssignableTo<(c: 3, x: unknown) => 4>();

    expect(curried(1, 2)).type.toBeAssignableTo<(c: 3) => 4>();
    expect(curried(1, 2)).type.toBeAssignableTo<(c: 3, x: unknown) => 4>();
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
