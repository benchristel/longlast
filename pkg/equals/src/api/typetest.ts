import {test, expect} from "tstyche";
import {equals} from "../index.ts";

test("equals", () => {
    expect(equals(true, true)).type.toBeAssignableTo<boolean>();
});
