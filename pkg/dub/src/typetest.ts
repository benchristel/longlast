import {dub} from "./index.ts";
import {describe, it, expect} from "tstyche";

describe("dub", () => {
    it("returns a function of the same type it was given", () => {
        const numToString = (x: number) => String(x);
        expect(dub("", numToString)).type.toBe<typeof numToString>();
    });

    it("rejects a non-function", () => {
        expect(dub).type.not.toBeCallableWith("", {});
    });

    it("rejects a non-string name", () => {
        expect(dub).type.not.toBeCallableWith(99, () => {});
    });
});
