import {pipe} from "#@longlast/pipe";
import {describe, it, expect} from "tstyche";

const numberToString = (x: number) => String(x);
const stringToNumber = (s: string) => +s;

describe("pipe", () => {
    it("checks the types of its arguments", () => {
        expect(pipe).type.not.toBeCallableWith(stringToNumber, stringToNumber);
    });

    it("composes two functions", () => {
        const roundTripNumber = pipe(numberToString, stringToNumber);

        expect(roundTripNumber).type.toBeCallableWith(0);
        expect(roundTripNumber).type.not.toBeCallableWith("");
        expect(roundTripNumber(0)).type.toBe<number>();
    });

    it("composes three functions", () => {
        const fidget = pipe(numberToString, stringToNumber, numberToString);

        expect(fidget).type.toBeCallableWith(0);
        expect(fidget).type.not.toBeCallableWith("");
        expect(fidget(0)).type.toBe<string>();
    });
});
