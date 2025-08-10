import {test, expect} from "tstyche"
import {$equals} from "./index.ts"

test("$equals is a unique symbol", () => {
    expect($equals).type.toBeAssignableTo<Symbol>()
    expect($equals).type.not.toBeAssignableWith<Symbol>()
})
