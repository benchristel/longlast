import {test, expect, equals} from "@benchristel/taste";
import {getBoundArguments} from "./index.ts";
import {$getBoundArguments} from "@longlast/symbols";

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
