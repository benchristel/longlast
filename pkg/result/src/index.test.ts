import {test, expect, equals, not} from "@benchristel/taste";
import {success} from "./index.ts";

test("a success", {
    "wraps a value"() {
        expect(success(42).value, equals, 42);
    },

    "is equal to another success with the same value"() {
        expect(success(42), equals, success(42));
    },

    "is unequal to a success with a different value"() {
        expect(success(42), not(equals), success(54));
    },
});
