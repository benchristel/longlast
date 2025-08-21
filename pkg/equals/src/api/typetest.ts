import {describe, it, expect} from "tstyche";
import {equals} from "../index.ts";

describe("equals", () => {
    it("returns a boolean", () => {
        expect(equals(1, 1)).type.toBeAssignableTo<boolean>();
    });

    it("has contravariant parameter types and covariant return type", () => {
        expect(equals).type.toBeAssignableTo<(a: number, b: string) => void>();
    });

    it("ignores a third argument", () => {
        expect(equals).type.toBeAssignableTo<
            (a: number, b: string, c: unknown) => void
        >();
    });

    it("is curried", () => {
        expect(equals).type.toBeAssignableTo<
            (a: number) => (b: string) => void
        >();
    });

    it("ignores a third argument after partial application", () => {
        expect(equals).type.toBeAssignableTo<
            (a: number) => (b: string, c: boolean) => void
        >();
    });
});
