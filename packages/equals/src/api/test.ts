import {test, expect, is} from "@benchristel/taste"
import {equals} from "../index.ts"

test("equals", {
    "compares booleans"() {
        expect(equals(true, false), is, false);
        expect(equals(false, false), is, true);
    },
})
