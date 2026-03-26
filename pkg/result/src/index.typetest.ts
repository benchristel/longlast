import {describe, it, expect} from "tstyche";
import {success, failure, type Result} from "./index.ts";

describe("a success", () => {
    it("has an immutable value", () => {
        expect(success(1).value).type.toBe<number>();
        // @ts-expect-error Cannot assign to 'value' because it is a read-only property.
        success(1).value = 2;
    });

    it("is a type of Result", () => {
        expect(success(1)).type.toBeAssignableTo<Result<number, string>>();
    });
});

describe("a failure", () => {
    it("has an immutable detail", () => {
        expect(failure(1).detail).type.toBe<number>();
        // @ts-expect-error Cannot assign to 'detail' because it is a read-only property.
        failure(1).detail = 2;
    });

    it("is a type of Result", () => {
        expect(failure(1)).type.toBeAssignableTo<Result<string, number>>();
    });
});
