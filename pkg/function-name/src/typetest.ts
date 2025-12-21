import {describe, expect, it} from "tstyche";
import {setFunctionName} from "./index.ts";

describe("setFunctionName", () => {
    it("returns a function of the same type it was given", () => {
        function add(a: number, b: number): number {
            return a + b;
        }
        const plus = setFunctionName("plus", add);
        expect(plus).type.toBe<typeof add>();
    });
});
