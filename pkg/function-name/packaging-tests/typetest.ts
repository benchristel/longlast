import {describe, expect, it} from "tstyche";
import {getFunctionName} from "#@longlast/function-name";

describe("getFunctionName", () => {
    it("returns a string", () => {
        expect(getFunctionName(() => {})).type.toBe<string>();
    });
});
