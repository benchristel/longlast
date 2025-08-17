import {test, expect, is} from "@benchristel/taste";
import {equals} from "#@longlast/equals";

test("equals", {
    exists() {
        expect(equals(1, 1), is, true);
    },
});
