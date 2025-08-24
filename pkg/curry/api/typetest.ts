import {test, expect} from "tstyche";
import {curry} from "#@longlast/curry";

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
