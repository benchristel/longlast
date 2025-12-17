import {functionName} from "#@longlast/function-name";
import {test, expect, is} from "@benchristel/taste";

test("functionName", {
    "returns a string"() {
        expect(
            functionName(() => {}),
            is,
            "",
        );
    },
});
