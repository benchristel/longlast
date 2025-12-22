import {describe, it, expect} from "tstyche";
import {type AnyFunction} from "@longlast/any-function";
import {dub} from "./index.ts";

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

    it("returns the correct type when partially applied", () => {
        expect(dub("")).type.toBe<<F extends AnyFunction>(f: F) => F>();
        const numToString = (x: number) => String(x);
        expect(dub("")(numToString)).type.toBe<typeof numToString>();
    });
});
