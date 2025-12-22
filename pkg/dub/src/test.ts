import {test, expect, is} from "@benchristel/taste";
import {getFunctionName} from "@longlast/function-name";
import {dub} from "./index.ts";

test("dub", {
    "sets the displayName property on the function"() {
        const f = () => {};

        dub("a new name", f);

        expect(getFunctionName(f), is, "a new name");
    },

    "returns the function"() {
        const f = () => {};
        expect(dub("", f), is, f);
    },
});
