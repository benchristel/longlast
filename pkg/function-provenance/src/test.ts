import {test, expect, equals, is} from "@benchristel/taste";
import {getBoundArguments, getUnapplied} from "./index.ts";
import {$getBoundArguments, $unapplied} from "@longlast/symbols";

test("getBoundArguments", {
    "returns empty given a plain function"() {
        const f = () => {};
        expect(getBoundArguments(f), equals, []);
    },

    "delegates to [$getBoundArguments]"() {
        const f = () => {};
        (f as any)[$getBoundArguments] = () => ["foo"];
        expect(getBoundArguments(f), equals, ["foo"]);
    },
});

test("getUnapplied", {
    "returns a function's [$unapplied] property"() {
        const f = () => {};
        (f as any)[$unapplied] = "the value";
        expect(getUnapplied(f), is, "the value");
    },

    "defaults to returning the function itself"() {
        const f = () => {};
        expect(getUnapplied(f), is, f);
    },
});
