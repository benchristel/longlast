import {test, expect, equals, is, not} from "@benchristel/taste";
import {success, failure} from "./index.ts";

test("a success", {
    "wraps a value"() {
        expect(success(42).value, equals, 42);
    },

    "knows it is a success"() {
        expect(success(42).isSuccess(), is, true);
    },

    "is equal to another success with the same value"() {
        expect(success(42), equals, success(42));
    },

    "is unequal to a success with a different value"() {
        expect(success(42), not(equals), success(54));
    },
});

test("a failure", {
    "wraps details about what went wrong"() {
        expect(failure("uh oh").detail, equals, "uh oh");
    },

    "is equal to another failure with the same detail"() {
        expect(failure("uh oh"), equals, failure("uh oh"));
    },

    "is unequal to a failure with different details"() {
        expect(failure("uh oh"), not(equals), failure("kablooie"));
    },
});
