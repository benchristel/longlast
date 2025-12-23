import {partialApply} from "#@longlast/partial-apply";
import {describe, expect, it} from "tstyche";

describe("partialApply", () => {
    const add = (a: number, b: number) => a + b;

    it("checks the types of its arguments", () => {
        expect(partialApply).type.toBeCallableWith(0, add);
        expect(partialApply).type.not.toBeCallableWith("", add);
    });

    it("returns a function of the correct type", () => {
        const inc = partialApply(1, add);
        expect(inc).type.toBeAssignableTo<(x: number) => number>();
        expect(inc).type.not.toBeAssignableTo<(x: number) => string>();
        expect(inc).type.not.toBeAssignableTo<(x: string) => number>();
    });

    it("complains if passed to Array#map", () => {
        // This test ensures that the "curried" unary signature is not used
        // when the second argument passed to partialApply has the wrong type.
        // @ts-expect-error Types of parameters 'f' and 'index' are incompatible.
        [1].map(partialApply);
    });
});
