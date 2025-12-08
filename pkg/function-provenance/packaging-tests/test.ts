import {getBoundArguments} from "#@longlast/function-provenance";
import {equals, expect, test} from "@benchristel/taste";

test("getBoundArguments", {
    "returns an array"() {
        const f = () => {};
        expect(getBoundArguments(f), equals, []);
    },
});
