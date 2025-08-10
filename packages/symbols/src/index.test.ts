import {test, expect, is, not} from "@benchristel/taste"
import {$equals} from "./index.ts"

test("$equals", {
    "is not equal to any other symbol"() {
        expect($equals, not(is), Symbol())
    }
})
