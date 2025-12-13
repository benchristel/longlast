import {pipe} from "#@longlast/pipe";
import {expect} from "tstyche";

const numberToString = (x: number) => String(x);
const stringToNumber = (s: string) => +s;

expect(pipe).type.not.toBeCallableWith(stringToNumber, stringToNumber);

const roundTripNumber = pipe(numberToString, stringToNumber);

expect(roundTripNumber).type.toBeCallableWith(0);
expect(roundTripNumber).type.not.toBeCallableWith("");

const fidget = pipe(numberToString, stringToNumber, numberToString);

expect(fidget).type.toBeCallableWith(0);
