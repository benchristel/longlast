import {success, type Success} from "#@longlast/result";
import {describe, it, expect} from "tstyche";

describe("the result package", () => {
    it("exports usable types", () => {
        expect(success(1)).type.toBe<Success<number>>();
    });
});
