import {dub} from "#@longlast/dub";
import {describe, it, expect} from "tstyche";

describe("dub", () => {
    it("returns a function of the same type it was given", () => {
        const numToString = (x: number) => String(x);
        expect(dub("", numToString)).type.toBe<typeof numToString>();
    });
});
