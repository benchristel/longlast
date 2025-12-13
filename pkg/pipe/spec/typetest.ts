import {pipe} from "#@longlast/pipe";
import {expect} from "tstyche";

const numberToString = (x: number) => String(x);
const stringToNumber = (s: string) => +s;

const roundTripNumber = pipe(numberToString, stringToNumber);

expect(roundTripNumber).type.toBeCallableWith(0);
expect(roundTripNumber).type.not.toBeCallableWith("");
expect(pipe).type.not.toBeCallableWith(stringToNumber, stringToNumber);
