import {test, expect, equals, is, not} from "@benchristel/taste";
import {success, failure} from "./index.ts";

test("a success", {
    "wraps a value"() {
        expect(success(42).value, equals, 42);
    },

    "knows it is a success"() {
        expect(success(0).isSuccess(), is, true);
    },

    "knows it is not a failure"() {
        expect(success(0).isFailure(), is, false);
    },

    "is equal to another success with the same value"() {
        expect(success(42), equals, success(42));
    },

    "is unequal to a success with a different value"() {
        expect(success(42), not(equals), success(54));
    },

    "can be transformed without unwrapping, via mapSuccess"() {
        const times = (a: number) => (b: number) => a * b;
        expect(success(6).mapSuccess(times(9)), equals, success(54));
    },
});

test("a failure", {
    "wraps details about what went wrong"() {
        expect(failure("uh oh").detail, equals, "uh oh");
    },

    "knows it is a failure"() {
        expect(failure(0).isFailure(), is, true);
    },

    "knows it is not a success"() {
        expect(failure(0).isSuccess(), is, false);
    },

    "is equal to another failure with the same detail"() {
        expect(failure("uh oh"), equals, failure("uh oh"));
    },

    "is unequal to a failure with different details"() {
        expect(failure("uh oh"), not(equals), failure("kablooie"));
    },
});
