import {describe, expect, it} from "tstyche";
import {functionName} from "#@longlast/function-name";

describe("functionName", () => {
    it("returns a string", () => {
        expect(functionName(() => {})).type.toBe<string>();
    });
});
