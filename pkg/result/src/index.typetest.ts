import {describe, it, expect} from "tstyche";
import {success} from "./index.ts";

describe("a success", () => {
    it("has an immutable value", () => {
        expect(success(1).value).type.toBe<number>();
        // @ts-expect-error Cannot assign to 'value' because it is a read-only property.
        success(1).value = 2;
    });
});
