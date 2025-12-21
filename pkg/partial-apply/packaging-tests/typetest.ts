import {partialApply} from "#@longlast/partial-apply";
import {describe, expect, it} from "tstyche";

describe("partialApply", () => {
    it("returns a function with one fewer parameter", () => {
        function foo(_x: number, _s: string): boolean {
            return true;
        }

        const applied = partialApply(1, foo);
        expect(applied).type.toBeAssignableTo<(s: string) => boolean>();
        expect(applied).type.not.toBeAssignableTo<(x: number) => boolean>();
    });
});
