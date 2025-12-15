import {getFunctionName} from "#@longlast/function-name";
import {test, expect, is} from "@benchristel/taste";

test("getFunctionName", {
    "returns a string"() {
        expect(
            getFunctionName(() => {}),
            is,
            "",
        );
    },
});
