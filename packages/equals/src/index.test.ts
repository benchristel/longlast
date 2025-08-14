import {test, expect, is} from "@benchristel/taste"
import {equals} from "./index.ts"

test("equals", {
    "given equal booleans"() {
        expect(equals(false, false), is, true)
    },

    "given unequal booleans"() {
        expect(equals(false, true), is, false)
    },
})
